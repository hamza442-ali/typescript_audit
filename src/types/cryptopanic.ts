interface CryptoPanicResult {
    created_at: string
    currencies: [{
        code: string
        title: string
        slug: string
        url: string
    }]
    domain: string
    id: number
    kind: string
    published_at: string
    slug: string
    source: {
        title: string
        region: string
        domain: string
        path?: string
    }
    title: string
    url: string
    votes: {
        comments: number
        disliked: number
        important: number
        liked: number
        lol: number
        negative: number
        positive: number
        saved: number
        toxic: number
    }
}

export default interface CryptoPanicResponse {
    count: number
    next?: string
    previous?: string
    results: CryptoPanicResult[]
}