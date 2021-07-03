import {NextApiResponse} from "next";

export default (response: NextApiResponse, e: any) => {
    const {type, message} = e;

    // TODO: realizar a integração com o bugsnag

    return response.status(400).json({type, message});
}
