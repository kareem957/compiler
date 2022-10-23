import axios from "axios";
import { isEmpty } from "lodash";

import type { NextApiRequest, NextApiResponse } from "next";

const compilePythonWithOutInput = async (req: NextApiRequest, res: NextApiResponse) => {
    const { code = "", input = "" } = JSON.parse(req.body);
    let url = "https://online-compiler-hwqk.onrender.com/api/python";
    type inputPayload = { [key: string]: string | number | number[] };

    const payload: inputPayload = { code };

    if (!isEmpty(input)) {
        url += "/withInput";
        payload.input = input;
    }

    try {
        const response = await axios.post(url, payload);
        const { data } = response;
        return res.status(200).json(data);
    } catch (err) {
        if (err instanceof Error) {
            const { data } = err.response;
            return res.status(500).json(data);
        }
    }
};

export default compilePythonWithOutInput;
