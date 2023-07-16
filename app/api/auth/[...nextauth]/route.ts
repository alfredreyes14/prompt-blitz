import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { OAuthUserConfig } from "next-auth/providers";
import { GoogleProfile } from "next-auth/providers/google";

import User from "@models/user";

import { connectToDB } from "@utils/database";

const googleConfig: OAuthUserConfig<GoogleProfile> = {
  clientId: process.env.GOOGLE_ID || "",
  clientSecret: process.env.GOOGLE_SECRET || ""
}

const handler = NextAuth({
  providers: [
    GoogleProvider(googleConfig)
  ],
  callbacks: {
    async session ({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email })
  
      session.user.id = sessionUser._id.toString()
  
      return session
    },
    async signIn ({ profile }: any) {
      try {
        await connectToDB()
        const userExists = await User.findOne({ email: profile?.email })
  
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name.trim().replace(" ", "").toLowerCase(),
            image: profile.picture
          })
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    }
  }
})

export { handler as GET, handler as POST }