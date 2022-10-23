import { isEmpty } from "lodash";
import axios, { AxiosError } from "axios";

import type { NextApiRequest, NextApiResponse } from "next";

type ServerError = { errorMessage: string };

const compileJavascriptCode = async (req: NextApiRequest, res: NextApiResponse) => {
    const { code = "", input = "" } = JSON.parse(req.body);
    let url = "https://online-compiler-hwqk.onrender.com/api/javascript";
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
        if (axios.isAxiosError(err)) {
            const serverError = err as AxiosError<ServerError>;
            console.log(serverError);
            if (serverError && serverError.response) {
                return res.status(500).json(serverError.response.data);
            }
        }
    }
};

export default compileJavascriptCode;
