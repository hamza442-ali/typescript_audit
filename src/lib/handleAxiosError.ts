import axios, { AxiosError } from "axios";
import { NextApiResponse } from "next";

const statusMessage = (status: number, text: string) => {
    return `Axios response error: ${status} (${text})`
}

const handleAxiosError = (res: NextApiResponse) => {
    return ((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
            if (err.response) {
                const { status, statusText, config } = err.response
                console.log(`Axios Response Error ${status} (${statusText})`, config)
                res.status(err.response.status).end()
            } else if (err.request) {
                console.log("Axios Request Error", err.request)
                res.status(500).end()
            } else {
                throw new Error(err.message)
            }
        } else {
            throw err
        }
    })
}

export const handleAxiosClientError = ((err: Error | AxiosError) => {
    if (axios.isAxiosError(err)) {
        if (err.response) {
            console.log(statusMessage(err.response.status, err.response.statusText))
        } else if (err.request) {
            console.log(err.request)
        } else {
            console.log('Error', err.message)
        }
    }
    throw err
})

export default handleAxiosError;
