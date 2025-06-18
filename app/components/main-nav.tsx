import * as React from "react";
import { Link } from "react-router"; // Keep react-router Link
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu"; // Correct path

const formComponents: { title: string; to: string; description: string; }[] = [
  {
    title: "All Forms",
    to: "/forms",
    description: "View and manage all your form definitions.",
  },
  {
    title: "Create New Form",
    to: "/forms/create",
    description: "Design and create a new form definition.",
  },
];

const submissionComponents: { title: string; to: string; description: string; }[] = [
  {
    title: "All Submissions",
    to: "/form-submissions",
    description: "View all submitted data across all forms.",
  },
  // TODO: Add a way to view submissions by specific form if needed
];

export function MainNav() { // Keeping MainNav as the export name
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="px-5 gap-5">
        <NavigationMenuItem>
          <Link className="bg-transparent" to="/">
            Handl&copy;
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Forms</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {formComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  to={component.to}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Submissions</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"> {/* Adjusted grid for consistency */}
              {submissionComponents.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  to={component.to}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="ml-auto"> {/* Moved to end and added ml-auto */}
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/dashboard">
              Dashboard
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/* Removed other example NavigationMenuItems not relevant to the app */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  to, // Changed href to to for react-router Link
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { to: string; }) { // Changed href to to
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={to} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"> {/* Added className from example */}
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
