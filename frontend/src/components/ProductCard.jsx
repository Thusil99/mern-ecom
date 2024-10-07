import {
  Box,
  Container,
  Heading,
  Image,
  Text,
  IconButton,
  HStack,
  VStack,
  Input,
  Button,
  useColorModeValue,
  useToast,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import { useState } from "react";
import { useProductStore } from "../../store/products";

const ProductCard = ({ product }) => {
  const [updatedProduct, setupdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid);
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
  };
  const handleUpdate = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
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
        description: "Product updated successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  return (
    <Container>
      <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
      >
        <Image
          src={product.image}
          alt={product.name}
          h={48}
          w="full"
          objectFit="cover"
        />
        <Box p={4}>
          <Heading as="h3" size="md" mb={2}>
            {product.name}
          </Heading>
          <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
            ${product.price}
          </Text>
          <HStack spacing={2}>
            <IconButton
              icon={<EditIcon />}
              onClick={onOpen}
              colorScheme="blue"
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => handleDelete(product._id)}
              colorScheme="red"
            />
          </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) => {
                    setupdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    });
                  }}
                />
                <Input
                  placeholder="Product Price"
                  name="price"
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) => {
                    setupdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    });
                  }}
                />
                <Input
                  placeholder="Image URL"
                  name="image"
                  value={updatedProduct.image}
                  onChange={(e) => {
                    setupdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    });
                  }}
                />
              </VStack>
            </ModalBody>

            <ModalFooter gap={2}>
              <Button
                colorScheme="blue"
                onClick={() => handleUpdate(product._id, updatedProduct)}
              >
                Update
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Container>
  );
};

export default ProductCard;
