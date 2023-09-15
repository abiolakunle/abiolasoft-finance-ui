import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { MdAdd } from 'react-icons/md';
import { Icon } from '@chakra-ui/icons';

const CustomerInvoiceComponent = () => {
  return (
    <>
      <Flex 

        pt={{ base: "130px", md: "80px", xl: "80px" }}
        my="0px"
        h="fit-content"
        align={{ base: "center", xl: "center" }}
        justify={{
            base: "flex-end",
            xl: "flex-end",
        }}
        gap="20px">

        <ChakraLink as={ReactRouterLink} to={`/admin/modules/sales/customerinvoice/new`}>
          <Button leftIcon={<Icon as={MdAdd} width="20px" height="20px" color="inherit" />} variant="brand">
            Add New Customer Invoice
          </Button>
        </ChakraLink>

      </Flex>
    </>
  )
}

export default CustomerInvoiceComponent
