import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req: any, { params }) => {
  try {
    await connectToDB()
    const prompt = await Prompt.findById(params.id).populate('creator')
    if (!prompt) return new Response("Prompt does not exist", { status: 404 })
    
    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response('Error in fetching prompt', { status: 500 })
  }
}

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json()

  try {
    await connectToDB()

    let existingPrompt = await Prompt.findById(params.id)
    if (!existingPrompt) return new Response("Prompt does not exist", { status: 404 })

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response(existingPrompt, { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response("Error in updating the prompt", { status: 500 })
  }
}

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    await Prompt.findByIdAndRemove(params.id)

    return new Response("Delete is successful", { status: 200 })
  } catch (error) {
    return new Response("Error in deleting the prompt", { status: 500 })
  }
}
