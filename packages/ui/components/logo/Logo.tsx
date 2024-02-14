import classNames from "@calcom/lib/classNames";

export default function Logo({
  small,
  icon,
  inline = true,
  className,
  src,
}: {
  small?: boolean;
  icon?: boolean;
  inline?: boolean;
  className?: string;
  src?: string;
}) {
  return (
    <h3 className={classNames("logo", inline && "inline", className)}>
      <strong>
        {icon ? (
          <img className="mx-auto w-9 dark:invert" alt="Cal" title="Cal" src={`${src}?type=icon`} />
        ) : (
          <>
            <img
              className={classNames(small ? "h-12 w-auto" : "h-14 w-auto", "dark:hidden")}
              alt="Bakklog"
              title="Bakklog"
              src="https://res.cloudinary.com/scope-web-llc/image/upload/v1645049239/bakklog/logo.png"
            />
            <img
              className={classNames(small ? "h-12 w-auto" : "h-14 w-auto", "hidden dark:block")}
              alt="Bakklog"
              title="Bakklog"
              src="https://res.cloudinary.com/scope-web-llc/image/upload/v1707212671/logo-white.png"
            />
          </>
        )}
      </strong>
    </h3>
  );
}
