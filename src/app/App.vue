<template>
<v-app id="inspire">
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
        <v-list dense>
            <template v-for="item in items">
                <v-layout v-if="item.heading" :key="item.heading" row align-center>
                    <v-flex xs6>
                        <v-subheader v-if="item.heading">
                            {{ item.heading }}
                        </v-subheader>
                    </v-flex>
                    <v-flex xs6 class="text-xs-center">
                        <a href="#!" class="body-2 black--text">EDIT</a>
                    </v-flex>
                </v-layout>
                <!-- INICIO MENU PLEGABLE -->
                <v-list-group v-else-if="item.children" v-model="item.model" :key="item.text" :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
                    <!-- PLEGABLE -->
                    <v-list-tile slot="activator">
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ item.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <!-- OPCIONES -->
                    <v-list-tile v-for="(child, i) in item.children" :key="i" @click="ruta(child.link)">
                        <v-list-tile-action v-if="child.icon">
                            <v-icon>{{ child.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ child.text }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list-group>
                <!-- FIN MENU PLEGABLE -->
                <!-- INICIO LISTADO MENU -->
                <v-list-tile v-else :key="item.text" @click="ruta(item.link)">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ item.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <!-- FIN LISTADO MENU -->
            </template>
        </v-list>
    </v-navigation-drawer>
    <!-- INICIO BARRA SUPERIOR -->
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="red darken-4" dark app fixed>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <span class="hidden-sm-and-down">Contol de Obras</span>
        </v-toolbar-title>
        <!-- <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search" class="hidden-sm-and-down"></v-text-field> -->
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon>notifications</v-icon>
        </v-btn>
    </v-toolbar>
    <!-- FIN BARRA SUPERIOR -->
    <v-content>
        <router-view></router-view>
    </v-content>
    <v-footer app fixed color="grey lighten-2">
        <span class="pl-5 font-weight-bold">&copy; 2018 Bracamonte</span>
    </v-footer>
</v-app>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    menu: "",
    drawer: null,
    items: [
      {
        icon: "category",
        "icon-alt": "category",
        text: "Catalogos",
        model: false,
        children: [
          {
            text: "Usuarios",
            link: "Usuarios"
          },
          {
            text: "Localidades",
            link: "Localidades"
          }
        ]
      },
      {
        icon: "local_grocery_store",
        text: "Test",
        link: "Test"
      }
    ]
  }),
  watch: {
    menu: function() {
      router.push(this.menu);
    }
  },
  methods: {
    ruta(ruta) {
      this.$router.replace({
        name: ruta
      });
    }
  },
  props: {
    source: String
  }
};
</script>
