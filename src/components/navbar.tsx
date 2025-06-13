import { FlexProps, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

interface NavbarLink {
  href: string;
  text: string;
}

export interface NavbarProps extends FlexProps {
  links: NavbarLink[];
}

export function Navbar({ links, ...props }: NavbarProps) {
  return (
    <Flex
      {...props}
      fontSize="small"
      textTransform="uppercase"
      spaceX={2}
      as="nav"
    >
      {links.map(({ href, text }) => (
        <Link key={href} href={href}>
          <Text>{text}</Text>
        </Link>
      ))}
    </Flex>
  );
}
