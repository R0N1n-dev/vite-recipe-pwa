<template>
    <div>
        <h1>Add recipes</h1>
        <!--<RecipesView :recipes="recipes" @delete="deleteRecipe" />-->
        <i-container>
            <i-row center>
                <i-column xs="11" sm="12" md="6" lg="" xl="">
                    <i-form>
                        <i-form-group>
                            <i-form-label>Name</i-form-label>
                            <i-input v-model="name" />
                        </i-form-group>
                        <i-form-group>
                            <i-form-label>Category</i-form-label>
                            <i-input v-model="type" />
                        </i-form-group>
                        <i-row class="_margin-y-1">
                            <i-column xs="12" sm="12" md="">
                                <i-form-group>
                                    <i-form-label>Ingredient</i-form-label>
                                    <i-input v-model="inMeasure">
                                        <span slot="append">
                                            <i-button @click.prevent="addIn">
                                                <i-icon icon="plus" />
                                            </i-button>
                                        </span>
                                    </i-input>
                                </i-form-group>
                            </i-column>
                            <i-column v-if="ingredients.length > 0" :class="ingredients.length > 0 ? '_margin-y-1' : ''">
                                <i-badge v-for="ingredient in ingredients" :key="ingredient"
                                    class="_margin-right-1 _margin-top-1">
                                    {{ ingredient }}
                                    <span style="cursor: pointer" @click.prevent="removeIngredient">
                                        <i-icon icon="times" />
                                    </span>
                                </i-badge>
                            </i-column>
                        </i-row>
                        <i-row>
                            <i-column xs="12" sm="12" md="">
                                <i-form-group>
                                    <i-form-label>Cooking Step</i-form-label>
                                    <i-textarea v-model="prepStep">
                                        <span slot="append" class="_display-flex">
                                            <i-button class="_border-0" @click.prevent="addStep">
                                                <i-icon icon="plus" />
                                            </i-button>
                                        </span>
                                    </i-textarea>
                                </i-form-group>
                            </i-column>
                            <i-column v-if="cookingSteps.length > 0" :class="cookingSteps.length > 0 ? '_margin-y-1' : ''">
                                <i-badge v-for="step in cookingSteps" :key="step" class="_margin-right-1 _margin-top-1">
                                    {{ step }}
                                    <span style="cursor: pointer" @click.prevent="removeCookingStep">
                                        <i-icon icon="times" />
                                    </span>
                                </i-badge>
                            </i-column>
                        </i-row>
                        <i-button class="_margin-top-1" @click.prevent="addRecipe">Add Recipe</i-button>
                    </i-form>
                </i-column>
            </i-row>
        </i-container>
    </div>
</template>

<script>
import { db } from "../database";
import { init } from "@paralleldrive/cuid2"
const length = 10;
const cuid = init({ length })
export default {
    data: () => ({
        name: "",
        type: "",
        inMeasure: "",
        ingredients: [],
        prepStep: "",
        cookingSteps: [],
        newRecipeAdded: false,
        //recipes: [],
    }),
    methods: {
        addIn() {
            if (this.inMeasure !== "") {
                this.ingredients.push(this.inMeasure);
                this.inMeasure = "";
                console.log("Succesfully added ingredient");
                console.log(this.ingredients);
            } else {
                alert("No ingredient, please add");
                return;
            }
        },
        removeIngredient() {
            this.ingredients.length > 0 && this.ingredients.pop();
        },
        removeCookingStep() {
            this.cookingSteps.length > 0 && this.cookingSteps.pop();
        },
        addStep() {
            if (this.prepStep !== "") {
                this.cookingSteps.push(this.prepStep);
                this.prepStep = "";
                console.log("Added cooking step");
            } else {
                alert("Step not added, add first");
                return;
            }
        },
        async addRecipe() {
            try {
                let newRecipe = {
                    id: cuid(),
                    name: this.name,
                    type: this.type,
                    ingredients: this.ingredients,
                    cookingSteps: this.cookingSteps,
                };
                await db.collection("Recipes").add(newRecipe);
                console.log("New recipe added");
                this.name = "";
                this.type = "";
                this.ingredients.length = 0;
                this.cookingSteps.length = 0;
                this.reLoad(200);
            } catch (error) {
                console.log(error.message);
            }
        },
        getRecipes() {
            db.collection("Recipes")
                .get()
                .then((Recipes) => {
                    this.recipes = Recipes;
                });
        },
        /*deleteRecipe(id) {
            db.collection("Recipes")
                .doc({ id })
                .delete()
                // eslint-disable-next-line no-unused-vars
                .then((res) => {
                    console.log("Recipe successfully deleted");
                    this.reLoad(200);
                })
                // eslint-disable-next-line no-unused-vars
                .catch((err) => {
                    alert(err + "Error deleting recipe");
                });
        },*/
        reLoad(time) {
            setTimeout(() => {
                this.getRecipes();
            }, time);
        },
    },
    /*mounted() {
        this.getRecipes();
    },*/
};
</script>

<style  scoped></style>