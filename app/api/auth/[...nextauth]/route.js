import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      session.user.settings = {};
      session.user.settings.stats = sessionUser.settings[0].stats[0];
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        //check if user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });
        //if not, create new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            name: profile.given_name,
            favTeam: undefined,
            image: profile.picture,
            settings: {
              stats: {
                gamesPlayed: true,
                groundOuts: false,
                airOuts: false,
                doubles: false,
                triples: false,
                homeRuns: true,
                strikeOuts: true,
                baseOnBalls: true,
                intentionalWalks: false,
                hits: true,
                hitByPitch: false,
                avg: true,
                atBats: true,
                obp: true,
                slg: true,
                ops: true,
                groundIntoDoublePlay: false,
                groundIntoTriplePlay: false,
                numberOfPitches: false,
                plateAppearances: true,
                totalBases: false,
                rbi: true,
                leftOnBase: false,
                sacBunts: false,
                sacFlies: false,
                babip: false,
                groundOutsToAirouts: false,
                catchersInterference: false,
                atBatsPerHomeRun: false,
              },
            }
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
