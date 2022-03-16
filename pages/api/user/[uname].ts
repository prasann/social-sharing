import type { NextApiRequest, NextApiResponse } from 'next'
import {User} from "./index";

export default function handler(req: NextApiRequest, res: NextApiResponse<User>) {
    const { uname } = req.query
    res.status(200).json({ name: uname.toString(), bio: `this is a bio of ${uname}` })
}
