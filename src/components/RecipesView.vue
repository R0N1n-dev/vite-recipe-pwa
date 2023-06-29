<template>
    <div>
        <h2>Recipes</h2>
        <div>
            <p v-if="!recipes.length">No recipes. Add some...</p>
            <div v-else>
                <ul>
                    <li v-for="recipe in recipes" :key="recipe.id">
                        <router-link :to="{ name: 'recipe', params: { name: recipe.name } }">
                            {{ recipe.name }}
                        </router-link>
                        <span @click.prevent='deleteRecipe(recipe.id)'>
                            <i-icon icon="times"></i-icon>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '../database';
export default {
    data: () => ({
        recipes: [],
    }),
    methods: {
        getRecipes() {
            db.collection("Recipes")
                .get()
                .then((Recipes) => {
                    this.recipes = Recipes;
                });
        },
        deleteRecipe(id) {
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
        },
        reLoad(time) {
            setTimeout(() => {
                this.getRecipes();
            }, time);
        },
    },
    mounted() {
        this.getRecipes();
    },
};
</script>

<style  scoped></style>