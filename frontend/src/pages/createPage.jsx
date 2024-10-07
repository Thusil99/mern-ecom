import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useProductStore } from "../../store/products";

const createPage = () => {
  const [newProduct, setnewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const { createProduct } = useProductStore();

  const handleNewProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
    setnewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setnewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Product Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setnewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setnewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleNewProduct} w={"full"}>
              Add a product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default createPage;
