import { connectToDB } from "@utils/database"
import User from "@models/user";

export const GET = async (_: any, { params }: any) => {
  try {
    await connectToDB()
    const prompts = await User.findOne({ _id: params.id })

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    return new Response('Error in fetching prompts', { status: 500 })
  }
}