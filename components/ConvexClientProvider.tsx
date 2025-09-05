"use client";

import { ReactNode, useEffect } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  SchematicProvider,
  useSchematicEvents,
} from "@schematichq/schematic-react";
import { EmbedProvider } from "@schematichq/schematic-components";

console.log("process.env", process.env);
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const ScematicWrapped = ({ children }: { children: React.ReactNode }) => {
  const { identify } = useSchematicEvents();
  const { user } = useUser();

  useEffect(() => {
    const userName =
      user?.username ??
      user?.fullName ??
      user?.emailAddresses[0]?.emailAddress ??
      user?.id;

    if (user?.id) {
      identify({
        name: userName,

        //user level keys
        keys: {
          id: user.id,
        },
        company: {
          keys: {
            id: user.id,
          },
          name: userName,
        },
      });
    }
  }, [user, identify]);

  return children;
};

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <SchematicProvider
        publishableKey={process.env.NEXT_PUBLIC_SCHEMATIC_PUBLIC_API_KEY!}
      >
        <EmbedProvider>
          <ScematicWrapped>{children}</ScematicWrapped>
        </EmbedProvider>
      </SchematicProvider>
    </ConvexProviderWithClerk>
  );
}
