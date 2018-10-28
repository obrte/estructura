<template>
<!-- <v-app id="mostrarCat"> -->
<div>
    <v-container class="mt-2 h100">
        <template>
            <v-card class="elevation-12">
                <v-card-title row>
                    Municipios - Localidades
                    <v-flex xs3 sm2 md1 pl-2>
                        <v-btn fab small dark color="green" @click.stop="dialog = !dialog">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs6 sm3 md3>
                        <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
                    </v-flex>
                </v-card-title>
                <v-data-table :headers="headersLocalidades" :items="localidades" :search="search" rows-per-page-text="Cantidad por página" :rows-per-page-items="itemsCantidad">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.index + 1 }}</td>
                        <td class="text-xs-left">{{ props.item.municipio.nombre }}</td>
                        <td class="text-xs-left">{{ props.item.nombre }}</td>
                        <td class="justify-center layout px-0">
                            <v-btn flat icon color="teal" @click="editarId(props.item.idLocalidad)">
                                <v-icon dark>edit</v-icon>
                            </v-btn>
                            <v-btn flat icon color="red" @click="modalEliminar(props.item.idLocalidad)">
                                <v-icon dark>delete</v-icon>
                            </v-btn>
                        </td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        No se encontró ninguna coincidencia para "{{ search }}".
                    </v-alert>
                    <template slot="pageText" slot-scope="props">
                        Elementos {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
                    </template>
                    <template slot="no-data">
                        <v-alert :value="true" color="warning" icon="warning">
                            No hay datos
                        </v-alert>
                    </template>
                </v-data-table>
            </v-card>
        </template>
    </v-container>

    <!-- snackbar -->
    <v-snackbar v-model="snackbar" :color="colorSnack" :timeout="timeout" right top multi-line>
        {{ mensaje }}
        <v-btn icon dark @click="snackbar = false">
            <v-icon>clear</v-icon>
        </v-btn>
    </v-snackbar>

    <!-- Modal Agregar/Editar -->
    <v-dialog v-model="dialog" width="800px">
        <v-card>
            <v-card-title class="grey lighten-4 py-4 title">
                {{ nuevo ? "Nueva Localidad" : "Editar Localidad" }}
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    <v-flex xs4>
                        <v-select v-model="selected.nombre" :items="municipios" item-text="nombre" item-value="idMunicipio" label="Municipio" persistent-hint return-object single-line></v-select>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="localidad.nombre" prepend-icon="place" placeholder="Nombre"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-actions>
                <v-btn flat color="red" @click="cancelar()">Cancelar</v-btn>
                <v-spacer></v-spacer>
                <v-btn flat color="green" @click="nuevo ? guardar() : editar()">Guardar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Modal Eliminar -->
    <template>
        <v-layout row justify-center>
            <v-dialog v-model="dialogEliminar" persistent max-width="290">
                <v-card>
                    <v-card-title class="headline">Eliminar este usuario?</v-card-title>
                    <v-card-text>Si se elimina no se podrá restaurar despues.</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" flat @click.native="eliminar(false)">Cancelar</v-btn>
                        <v-btn color="red darken-1" flat @click.native="eliminar(true)">Eliminar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </template>
</div>
<!-- </v-app> -->
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dialogEliminar: false,
      eliminarId: "",
      drawer: null,
      nuevo: true,
      search: "",
      mensaje: "",
      colorSnack: "",
      snackbar: false,
      timeout: 5000,
      localidades: [],
      localidad: {},
      municipios: [],
      itemsCantidad: [
        10,
        20,
        30,
        {
          text: "$vuetify.dataIterator.rowsPerPageAll",
          value: -1
        }
      ],
      headersLocalidades: [
        {
          text: "#",
          align: "left",
          sortable: false,
          value: "index",
          width: "50"
        },
        {
          text: "Municipio",
          align: "left",
          value: "municipio.nombre",
          width: "200"
        },

        {
          text: "Localidad",
          align: "left",
          value: "nombre"
        },
        {
          text: "Acciones",
          align: "center",
          sortable: false,
          value: "acciones",
          width: "300"
        }
      ],
      selected: {
        nombre: "",
        idMunicipio: ""
      }
    };
  },
  watch: {
    dialog: function() {
      if (!this.dialog) {
        this.nuevo = true;
        this.localidad = {};
        this.selected = {
          nombre: "",
          idMunicipio: ""
        };
      }
    }
  },
  created() {
    this.getLocalidades();
    this.getMunicipios();
  },
  methods: {
    getMunicipios() {
      this.axios
        .get("/municipios")
        .then(res => {
          this.municipios = res.data;
        })
        .catch(err => {
          this.mensaje = err.response.data.msg;
          this.colorSnack = "red darken-4";
          this.snackbar = true;
        });
    },
    getLocalidades() {
      this.axios
        .get("/localidades")
        .then(res => {
          this.localidades = res.data;
        })
        .catch(err => {
          this.mensaje = err.response.data.msg;
          this.colorSnack = "red darken-4";
          this.snackbar = true;
        });
    },
    guardar() {
      if (this.selected.nombre == "") {
        this.mensaje = "Debe seleccionar un Municipio";
        this.colorSnack = "red darken-4";
        this.snackbar = true;
      } else {
        this.localidad.idMunicipio = this.selected.idMunicipio;
        this.axios
          .post("/localidades", {
            localidad: this.localidad
          })
          .then(res => {
            this.dialog = false;
            this.getLocalidades();
          })
          .catch(err => {
            this.mensaje = err.response.data.msg;
            this.colorSnack = "red darken-4";
            this.snackbar = true;
          });
      }
    },
    modalEliminar(id) {
      this.eliminarId = id;
      this.dialogEliminar = true;
    },
    eliminar(respuesta) {
      this.dialogEliminar = false;
      if (respuesta) {
        this.axios
          .delete("/localidades/" + this.eliminarId)
          .then(res => {
            this.getLocalidades();
            this.eliminarId = "";
            this.mensaje = "Eliminación exitosa";
            this.colorSnack = "red darken-4";
            this.snackbar = true;
          })
          .catch(err => {
            this.mensaje = err.response.data.msg;
            this.colorSnack = "red darken-4";
            this.snackbar = true;
          });
      } else {
        this.eliminarId = "";
      }
    },
    editarId(id) {
      this.axios
        .get("/localidades/" + id)
        .then(res => {
          this.localidad = res.data;
          this.selected.idMunicipio = this.localidad.municipio.idMunicipio;
          this.selected.nombre = this.localidad.municipio.nombre;
          this.dialog = true;
          this.nuevo = false;
        })
        .catch(err => {
          this.mensaje = err.response.data.msg;
          this.colorSnack = "red darken-4";
          this.snackbar = true;
        });
    },
    editar() {
      this.axios
        .patch("/localidades/" + this.localidad.idLocalidad, {
          localidad: this.localidad
        })
        .then(res => {
          this.dialog = false;
          this.getLocalidades();
          this.mensaje = "Guardado!!";
          this.colorSnack = "green";
          this.snackbar = true;
        })
        .catch(err => {
          this.mensaje = err.response.data.msg;
          this.colorSnack = "red darken-4";
          this.snackbar = true;
        });
    },
    cancelar() {
      this.dialog = false;
    },
    test(texto) {
      alert(texto);
      console.log(texto);
    }
  }
};
</script>
