import { headerToken } from "@/app/api/auth/headerToken";

export const getOverviewData = async () => {
    const header = await headerToken()
    const res = await fetch(`${process.env.API_URL}dashboards`,
        {
            next: { tags: ['overview_event'] },
            headers: header
        }
    )
    const data = await res.json();
    return data
}

export const getAllCategory = async (page) => {
    const header = await headerToken()
    const res = await fetch(`${process.env.API_URL}categories?offset=${page ? page : 1}&limit=8`,
        {
            next: { tags: ['overview'] },
            headers: header
        }
    )
    const data = await res.json();
    return data
}

export const insertCategory = async (userInput) => {
    const header = await headerToken()
    const res = await fetch(`${process.env.API_URL}categories?categoryName=${userInput}`,
        {
            next: { tags: ['overview'] },
            method: 'POST',
            headers: header
        }
    )
    const data = await res.json();
    return data
}

export const deleteCategory = async (id) => {
    const header = await headerToken()
    const res = await fetch(`${process.env.API_URL}categories/${id}`,
        {
            next: { tags: ['overview'] },
            method: 'DELETE',
            headers: header
        }
    )
}

export const updateCategory = async (id, categoryName) => {
    const header = await headerToken()
    const res = await fetch(`${process.env.API_URL}categories/${id}?categoryName=${categoryName}`,
        {
            next: { tags: ['overview'] },
            method: 'PUT',
            headers: header
        }
    )
    const data = res.json();
    return data
}

export const createEventService = async (data) => {
    const header = await headerToken()
    const res = await fetch(`${process.env.API_URL}events`,
        {
            next: { tags: ['overview_event'] },
            body: JSON.stringify(data),
            method: 'POST',
            headers: header
        }
    )
    const val = await res.json()
    return val
}

export const allCategory = async () => {
    const header = await headerToken()
    const res = await fetch(`${process.env.API_URL}categories?offset=1&limit=100`,
        {
            next: { tags: ['overview'] },
            headers: header
        }
    )
    const data = await res.json();
    return data
}

export const storeImageService = async (image) => {
    try {
        const res = await fetch(`${process.env.API_URL}file`, {
            method: 'POST',
            body: image,
        })
        const data = await res.json();
        return data
    } catch (err) {
        console.log(`service error : ${err}`)
    }
}