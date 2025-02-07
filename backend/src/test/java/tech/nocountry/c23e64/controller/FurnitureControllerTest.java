package tech.nocountry.c23e64.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tech.nocountry.c23e64.dto.FurnitureDto;
import tech.nocountry.c23e64.dto.FurnitureUpdateDto;
import tech.nocountry.c23e64.exception.DuplicateResourceException;
import tech.nocountry.c23e64.exception.ResourceNotFoundException;
import tech.nocountry.c23e64.service.FurnitureService;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(FurnitureController.class)
public class FurnitureControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private FurnitureService furnitureService;

    @Test
    @DisplayName("Create furniture")
    public void createFurniture_ShouldReturnCreatedFurniture() throws Exception {
        FurnitureDto responseDto = new FurnitureDto();
        responseDto.setId(1L);
        responseDto.setName("Silla de madera");
        responseDto.setCategory("silla");
        responseDto.setStock(10);
        responseDto.setUnitPrice(BigDecimal.valueOf(25.0));
        responseDto.setDescription("Silla de madera color café");
        responseDto.setImageUri("https://www.example.com/silla.jpg");

        when(furnitureService.createFurniture(any())).thenReturn(responseDto);
        mockMvc.perform(post("/furniture")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "Silla de madera",
                                    "categoryName": "silla",
                                    "stock": 10,
                                    "unitPrice": 25.0,
                                    "description": "Silla de madera color café",
                                    "imageUri": "https://www.example.com/silla.jpg"
                                }"""))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                            "id": 1,
                            "name": "Silla de madera",
                            "category": "silla",
                            "stock": 10,
                            "unitPrice": 25.0,
                            "description": "Silla de madera color café",
                            "imageUri": "https://www.example.com/silla.jpg"
                        }"""));
    }

    @Test
    @DisplayName("Create furniture with missing required fields")
    public void createFurniture_MissingRequiredFields_ShouldReturnBadRequest() throws Exception {
        mockMvc.perform(post("/furniture")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "",
                                    "categoryName": "",
                                    "stock": 0,
                                    "unitPrice": 0.0,
                                    "description": "",
                                    "imageUri": ""
                                }"""))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Create furniture with invalid data types")
    public void createFurniture_InvalidDataTypes_ShouldReturnBadRequest() throws Exception {
        mockMvc.perform(post("/furniture")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": 123,
                                    "categoryName": true,
                                    "stock": "ten",
                                    "unitPrice": "twenty-five",
                                    "description": 456,
                                    "imageUri": 789
                                }"""))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Create duplicate furniture")
    public void createFurniture_DuplicateFurniture_ShouldReturnConflict() throws Exception {
        when(furnitureService.createFurniture(any())).thenThrow(new DuplicateResourceException("Furniture already exists"));

        mockMvc.perform(post("/furniture")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "Silla de madera",
                                    "categoryName": "silla",
                                    "stock": 10,
                                    "unitPrice": 25.0,
                                    "description": "Silla de madera color café",
                                    "imageUri": "https://www.example.com/silla"
                                }"""))
                .andExpect(status().isConflict());
    }

    @Test
    @DisplayName("Update furniture")
    public void updateFurniture_ShouldReturnUpdatedFurniture() throws Exception {
        FurnitureDto responseDto = new FurnitureDto();
        responseDto.setId(1L);
        responseDto.setName("Silla de madera actualizada");
        responseDto.setCategory("silla");
        responseDto.setStock(15);
        responseDto.setUnitPrice(BigDecimal.valueOf(30.0));
        responseDto.setDescription("Silla de madera color café actualizada");
        responseDto.setImageUri("https://www.example.com/silla_actualizada.jpg");

        when(furnitureService.updateFurniture(anyLong(), any(FurnitureUpdateDto.class))).thenReturn(responseDto);
        mockMvc.perform(patch("/furniture/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "Silla de madera actualizada",
                                    "categoryName": "silla",
                                    "stock": 15,
                                    "unitPrice": 30.0,
                                    "description": "Silla de madera color café actualizada",
                                    "imageUri": "https://www.example.com/silla_actualizada.jpg"
                                }"""))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": 1,
                            "name": "Silla de madera actualizada",
                            "category": "silla",
                            "stock": 15,
                            "unitPrice": 30.0,
                            "description": "Silla de madera color café actualizada",
                            "imageUri": "https://www.example.com/silla_actualizada.jpg"
                        }"""));
    }

    @Test
    @DisplayName("Update furniture with invalid ID")
    public void updateFurniture_InvalidId_ShouldReturnNotFound() throws Exception {
        when(furnitureService.updateFurniture(anyLong(), any(FurnitureUpdateDto.class))).thenThrow(new ResourceNotFoundException("Furniture not found"));

        mockMvc.perform(patch("/furniture/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "Silla de madera actualizada",
                                    "categoryName": "silla",
                                    "stock": 15,
                                    "unitPrice": 30.0,
                                    "description": "Silla de madera color café actualizada",
                                    "imageUri": "https://www.example.com/silla_actualizada.jpg"
                                }"""))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("Update furniture with missing required fields")
    public void updateFurniture_MissingRequiredFields_ShouldReturnBadRequest() throws Exception {
        mockMvc.perform(patch("/furniture/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "",
                                    "categoryName": "",
                                    "stock": 0,
                                    "unitPrice": 0.0,
                                    "description": "",
                                    "imageUri": ""
                                }"""))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Get all furniture")
    public void getAllFurniture_ShouldReturnFurnitureList() throws Exception {
        FurnitureDto responseDto = new FurnitureDto();
        responseDto.setId(1L);
        responseDto.setName("Silla de madera");
        responseDto.setCategory("silla");
        responseDto.setStock(10);
        responseDto.setUnitPrice(BigDecimal.valueOf(25.0));
        responseDto.setDescription("Silla de madera color café");
        responseDto.setImageUri("https://www.example.com/silla.jpg");

        when(furnitureService.getAllFurniture(isNull())).thenReturn(List.of(responseDto));
        mockMvc.perform(get("/furniture")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [{
                            "id": 1,
                            "name": "Silla de madera",
                            "category": "silla",
                            "stock": 10,
                            "unitPrice": 25.0,
                            "description": "Silla de madera color café",
                            "imageUri": "https://www.example.com/silla.jpg"
                        }]"""));
    }

    @Test
    @DisplayName("Get all furniture when database is empty")
    public void getAllFurniture_EmptyDatabase_ShouldReturnEmptyList() throws Exception {
        when(furnitureService.getAllFurniture(isNull())).thenReturn(Collections.emptyList());
        mockMvc.perform(get("/furniture")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DisplayName("Get furniture by ID")
    public void getFurnitureById_ShouldReturnFurniture() throws Exception {
        FurnitureDto responseDto = new FurnitureDto();
        responseDto.setId(1L);
        responseDto.setName("Silla de madera");
        responseDto.setCategory("silla");
        responseDto.setStock(10);
        responseDto.setUnitPrice(BigDecimal.valueOf(25.0));
        responseDto.setDescription("Silla de madera color café");
        responseDto.setImageUri("https://www.example.com/silla.jpg");

        when(furnitureService.getFurnitureById(anyLong(), isNull())).thenReturn(responseDto);
        mockMvc.perform(get("/furniture/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": 1,
                            "name": "Silla de madera",
                            "category": "silla",
                            "stock": 10,
                            "unitPrice": 25.0,
                            "description": "Silla de madera color café",
                            "imageUri": "https://www.example.com/silla.jpg"
                        }"""));
    }

    @Test
    @DisplayName("Get furniture by non-existent ID")
    public void getFurnitureById_NonExistentId_ShouldReturnNotFound() throws Exception {
        when(furnitureService.getFurnitureById(anyLong(), isNull())).thenThrow(new ResourceNotFoundException("Furniture not found"));

        mockMvc.perform(get("/furniture/999")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("Get furniture by invalid ID")
    public void getFurnitureById_InvalidId_ShouldReturnBadRequest() throws Exception {
        mockMvc.perform(get("/furniture/abc")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Delete furniture")
    public void deleteFurniture_ShouldReturnNoContent() throws Exception {
        mockMvc.perform(delete("/furniture/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("Delete furniture with invalid ID")
    public void deleteFurniture_InvalidId_ShouldReturnNotFound() throws Exception {
        doThrow(new ResourceNotFoundException("Furniture not found")).when(furnitureService).deleteFurniture(anyLong());

        mockMvc.perform(delete("/furniture/999")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("Delete furniture that is already deleted")
    public void deleteFurniture_AlreadyDeleted_ShouldReturnNotFound() throws Exception {
        doThrow(new ResourceNotFoundException("Furniture not found")).when(furnitureService).deleteFurniture(anyLong());

        mockMvc.perform(delete("/furniture/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

}
