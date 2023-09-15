import { Box, Card, Flex, Heading } from '@chakra-ui/react'
import React from 'react'

const NewInvoiceComponent = () => {
  return (
    <>

        <Flex
            pt={{ base: "130px", md: "80px", xl: "130px" }}
            my="0px"
            h="fit-content"
            align={{ base: "center", xl: "center" }}
            justify={{
                base: "flex-start",
                xl: "flex-start",
            }}
            gap="20px"
        >
            <Heading as="h4" size="md">
                New Invoice for Customer
            </Heading>
        </Flex>
        <Box maxW="1024px" pt={{ base: "16px", md: "16px", xl: "16px" }}>
            <Card px="32px" w="100%" overflowX={{ sm: "scroll", lg: "hidden" }}>
                
            </Card>
        </Box>


    </>
  )
}

export default NewInvoiceComponent
