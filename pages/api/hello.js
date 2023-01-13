// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// This is used to HTTP get or post requests

export default function handler(req, res) {
    res.status(200).json({ name: "John Doe" })
}
