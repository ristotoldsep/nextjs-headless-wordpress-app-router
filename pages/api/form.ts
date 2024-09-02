// form.ts
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const body = req.body;

    if(!body.firstName || !body.email || !body.message) {
        return res.status(400).json({data: "first name, email, and message fields are required!"});
    }

    return res.status(200).json({data: "form submitted successfully"});
}