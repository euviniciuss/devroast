import { cn } from '@/lib/utils';

function NavbarRoot({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center h-14 px-6 border-b border-border bg-background',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function NavbarLogo({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      {children}
    </div>
  );
}

function NavbarLogoPrompt({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('text-xl font-bold font-mono text-accent-green', className)}
      {...props}
    >
      {children || '>'}
    </span>
  );
}

function NavbarLogoText({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn('text-lg font-medium font-mono text-foreground', className)}
      {...props}
    >
      {children}
    </span>
  );
}

function NavbarSpacer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex-1', className)} {...props} />;
}

function NavbarLink({
  className,
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(
        'text-[13px] font-mono text-text-secondary hover:text-foreground transition-colors',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export const Navbar = {
  Root: NavbarRoot,
  Logo: NavbarLogo,
  LogoPrompt: NavbarLogoPrompt,
  LogoText: NavbarLogoText,
  Spacer: NavbarSpacer,
  Link: NavbarLink,
};
