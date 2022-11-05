import { Alert as AlertNativeBase, HStack, Text } from "native-base";

interface AlertProps {
  status?: "success" | "error" | "info" | "warning"
  title: string
}

export function Alert({ title, status = "success" }: AlertProps) {
  return (
    <AlertNativeBase w="100%" status={status}>
      <HStack flexShrink={1} space={2} alignItems="center" w="100%">
        <AlertNativeBase.Icon />
        <Text fontSize="md" >
          {title}
        </Text>
      </HStack>
    </AlertNativeBase>
  )
}
