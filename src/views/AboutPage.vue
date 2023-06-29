<template>
    <div>
        <TheNavbar />
        <i-container>
            <i-tabs stretch>
                <i-tab class="_border-0">
                    <template v-slot:title>
                        <i-icon icon="check"></i-icon>
                        Add Recipes
                    </template>
                    <RecipeForm />
                </i-tab>
                <i-tab class="_border-0">
                    <template v-slot:title>
                        <i-icon icon="info"></i-icon>
                        View recipes
                    </template>
                    <RecipesView />
                </i-tab>
            </i-tabs>
        </i-container>
    </div>
</template>

