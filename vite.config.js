import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                catalog: resolve(__dirname, 'catalog.html'),
                contacts: resolve(__dirname, 'contacts.html'),
                invite: resolve(__dirname, 'invite.html'),
                categories: resolve(__dirname, 'categories.html'),
                subCategories: resolve(__dirname, 'sub-categories.html'),
                product: resolve(__dirname, 'product.html'),
                promo: resolve(__dirname, 'promo.html'),
            },
        },
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'partials'),
        }),
    ],
})