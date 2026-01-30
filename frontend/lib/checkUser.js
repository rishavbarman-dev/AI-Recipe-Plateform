import { currentUser } from "@clerk/nextjs/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_API_KEY = process.env.STRAPI_API_KEY;

export const checkUser = async () => {
    const user = await currentUser();

    if(!user) {
        console.log("No user found");
        return null;
    }

    if(!STRAPI_API_KEY) {
        console.error("STRAPI_API_KEY is not set in environment variables");
        return null;
    }

    const subscriptionTier = "free";
    
    try {
        // Check if user exists in Strapi
        const existingUserRes = await fetch(`${STRAPI_URL}/api/users?filters[clerkId][$eq]=${user.id}`, {
            headers: {
                "Authorization": `Bearer ${STRAPI_API_KEY}`,
            },
            cache: "no-store",
        });

        if(!existingUserRes.ok) {
            const errorText = await existingUserRes.text();
            console.error("Strapi fetch error:", errorText);
            return null;
        }    


        const existingUserData = await existingUserRes.json();
       
        if(existingUserData.length > 0) {
            const existingUser = existingUserData[0];
            
            // Update subscription tier if changed
            if(existingUser.subscriptionTier !== subscriptionTier) {
                await fetch(`${STRAPI_URL}/api/users/${existingUser.id}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${STRAPI_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        subscriptionTier,
                    }),
                });
            }

            return {...existingUser, subscriptionTier};
        
        }

        // Get authenticated role
        const roleResponse = await fetch(`${STRAPI_URL}/api/users-permissions/roles`, {
            headers: {
                Authorization: `Bearer ${STRAPI_API_KEY}`,
            },
        });

        const rolesData = await roleResponse.json();
        const authenticatedRole = rolesData.roles.find(role => role.type === "authenticated");

        if(!authenticatedRole) {
            console.error("Authenticated role not found in Strapi");
            return null;
        }

        const userData = {
            username: user.username || user.emailAddresses[0]?.emailAddress.split("@")[0],
            email: user.emailAddresses[0]?.emailAddress,
            password: `clerk_managed_${user.id}_${Date.now()}`, // Random password since Clerk manages auth
            confirmed: true,
            blocked: false,
            role: authenticatedRole.id,

            clerkId: user.id,
            subscriptionTier,
        };

        const createUserRes = await fetch(`${STRAPI_URL}/api/users`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${STRAPI_API_KEY}`,
            },
            body: JSON.stringify(userData),
        });

        if(!createUserRes.ok) {
            const errorText = await createUserRes.text();
            console.error("Strapi user creation error:", errorText);
            return null;
        }

        const newUser = await createUserRes.json();
        return newUser;

    } catch (error) {
        console.error("Error checking user:", error);
    }
}