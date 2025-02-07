package tech.nocountry.c23e64.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tech.nocountry.c23e64.dto.CategoryDto;
import tech.nocountry.c23e64.service.CategoryService;

import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CategoryController.class)
public class CategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CategoryService categoryService;

    @Test
    @DisplayName("Create category")
    public void createCategory_ShouldReturnCreatedCategory() throws Exception {
        CategoryDto responseDto = new CategoryDto();
        responseDto.setId(1L);
        responseDto.setName("chair");
        responseDto.setDescription("Various types of chairs");
        responseDto.setImageUri("https://www.example.com/chair.jpg");

        when(categoryService.createCategory(any())).thenReturn(responseDto);
        mockMvc.perform(post("/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "chair",
                                    "description": "Various types of chairs",
                                    "imageUri": "https://www.example.com/chair.jpg"
                                }"""))
                .andExpect(status().isCreated())
                .andExpect(content().json("""
                        {
                            "id": 1,
                            "name": "chair",
                            "description": "Various types of chairs",
                            "imageUri": "https://www.example.com/chair.jpg"
                        }"""));
    }

    @Test
    @DisplayName("Get all categories")
    public void getAllCategories_ShouldReturnCategoryList() throws Exception {
        CategoryDto responseDto = new CategoryDto();
        responseDto.setId(1L);
        responseDto.setName("chair");
        responseDto.setDescription("Various types of chairs");
        responseDto.setImageUri("https://www.example.com/chair.jpg");

        when(categoryService.getAllCategories()).thenReturn(List.of(responseDto));
        mockMvc.perform(get("/categories")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [{
                            "id": 1,
                            "name": "chair",
                            "description": "Various types of chairs",
                            "imageUri": "https://www.example.com/chair.jpg"
                        }]"""));
    }

    // Edge cases

    @Test
    @DisplayName("Create category with missing required fields")
    public void createCategory_MissingRequiredFields_ShouldReturnBadRequest() throws Exception {
        mockMvc.perform(post("/categories")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "",
                                    "description": "",
                                    "imageUri": ""
                                }"""))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Get all categories when database is empty")
    public void getAllCategories_EmptyDatabase_ShouldReturnEmptyList() throws Exception {
        when(categoryService.getAllCategories()).thenReturn(Collections.emptyList());
        mockMvc.perform(get("/categories")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }
}