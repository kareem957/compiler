import util from "util";
import cuid from "cuid";
import fs from "fs/promises";
import { exec as execContext } from "child_process";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const exec = util.promisify(execContext);


const compilePythonWithInput = async (req: NextApiRequest, res: NextApiResponse) =>{
        const { code = "", input = "" } = JSON.parse(req.body);
        const filename = cuid.slug();
        const basePath = __dirname.split("/").slice(0,(__dirname.split("/").indexOf(".next"))).join("/");
        const path = `${basePath}/temp/${filename}.py`
        const inputFilePath = `${basePath}/temp/${filename}_input.txt`
        try {
            await fs.writeFile(path, code);
            await fs.writeFile(inputFilePath, input)
            const command = `python ${path} < ${inputFilePath}`;
            const { stderr, stdout } = await exec(command);
            if (stderr) {
                if (stderr.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1) {
                    const out = { error: 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.' };
                    res.status(400).json(out);
                } else {
                    console.log(`INFO: ${filename}.py contained an error while executing`);
                    const out = { error: stderr };
                    res.status(200).json(out)
                }
            }
            console.log(`INFO: ${filename}.py successfully executed !`);
            const out = { output: stdout };
            console.log(`INFO: ${filename}.py successfully deleted!`);
            await fs.unlink(path);
            console.log(`INFO: ${filename}_input.txt successfully deleted!`);
            await fs.unlink(inputFilePath);
            res.status(200).json({response: out});
        } catch (err) {
            res.status(500).json({ message: "Some Error occurred", err })
        }
}

export default compilePythonWithInput;