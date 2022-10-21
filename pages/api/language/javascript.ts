import util from "util";
import cuid from "cuid";
import fs from "fs/promises";
import { exec as execContext } from "child_process";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const exec = util.promisify(execContext);


const compileNodeWithInput = async (req: NextApiRequest, res: NextApiResponse) => {
    const {code, input = ""} = JSON.parse(req.body);
    const args = input?.split("\n")?.join(" ");
    const filename = cuid.slug();
    const basePath = __dirname.split("/").slice(0,(__dirname.split("/").indexOf(".next"))).join("/");
    const path = `${basePath}/temp/${filename}.js`
    try{
        await fs.writeFile(path, code);
        const command =  `node ${path} ${args}`;
        const {stderr, stdout} = await exec(command);
        if(stderr){
            if(stderr.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1){
                res.status(400).json({error: 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.'});
            }else{
                console.log(`INFO: ${filename}.js contained an error while executing`);
                res.status(200).json({ error: stderr });
            }
        }
        console.log(`INFO: ${filename}.js successfully executed !`);
        const out = { output : stdout};
        console.log(`INFO: ${filename}.js successfully deleted!`);
        await fs.unlink(path);
        res.status(200).json({response: out});
    }catch(err){
        res.status(500).json(err);
    }
}

export default compileNodeWithInput