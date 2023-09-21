import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"
import { NextRequest } from "next/server"

export const GET = async (request: NextRequest) => {
  try {
    const url: URL = new URL(request.url)
    const searchText: string | null = url.searchParams.get("searchText") || ''
    let prompts: any = []
    await connectToDB()

    prompts = (searchText !== '')
      ? await Prompt.find().or([ { prompt: searchText }, { tag: searchText } ]).populate('creator')
      : await Prompt.find({}).populate('creator')

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response('Error in fetching prompts', { status: 500 })
  }
}