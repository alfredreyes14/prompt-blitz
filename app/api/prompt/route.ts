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
      ? await Prompt.aggregate([
          {
            $lookup: {
              from: "users",
              localField: "creator",
              foreignField: "_id",
              as: "creator_info"
            }
          },
          {
            $match: {
              $or: [
                { prompt: { $eq: searchText } },
                { tag: { $eq: searchText } },
                { 'creator_info.email': searchText },
                { 'creator_info.username': searchText }
              ]
            }
          },
          {
            $project: {
              _id: 1,
              prompt: 1,
              tag: 1,
              creator: 1
            }
          }
        ]).exec()
      : await Prompt.find({}).populate('creator')

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('Error in fetching prompts', { status: 500 })
  }
}