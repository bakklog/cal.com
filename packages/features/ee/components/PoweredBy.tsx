import { useSession } from "next-auth/react";
import Link from "next/link";

import { useIsEmbed } from "@calcom/embed-core/embed-iframe";
import { APP_NAME, POWERED_BY_URL } from "@calcom/lib/constants";
import { useLocale } from "@calcom/lib/hooks/useLocale";

const PoweredByCal = ({ logoOnly }: { logoOnly?: boolean }) => {
  const { t } = useLocale();
  const session = useSession();
  const isEmbed = useIsEmbed();
  const hasValidLicense = session.data ? session.data.hasValidLicense : null;

  return (
    <div className={`p-2 text-center text-xs sm:text-right${isEmbed ? " max-w-3xl" : ""}`}>
      <Link href={POWERED_BY_URL} target="_blank" className="text-subtle">
        {!logoOnly && <>{t("powered_by")} </>}
        {APP_NAME === "Cal.com" || !hasValidLicense ? (
          <>
            <img
              className="h-14 w-auto dark:hidden"
              alt="Bakklog"
              title="Bakklog"
              src="https://res.cloudinary.com/scope-web-llc/image/upload/v1645049239/bakklog/logo.png"
            />
            <img
              className="hidden h-14 w-auto dark:block"
              alt="Bakklog"
              title="Bakklog"
              src="https://res.cloudinary.com/scope-web-llc/image/upload/v1707212671/logo-white.png"
            />
          </>
        ) : (
          <span className="text-emphasis font-semibold opacity-50 hover:opacity-100">{APP_NAME}</span>
        )}
      </Link>
    </div>
  );
};

export default PoweredByCal;
