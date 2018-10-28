<template>
<!-- <v-app id="mostrarCat"> -->
<div>
    <v-container class="mt-2 h100">
        <template>
            <v-card class="elevation-12">
                <v-card-title row>
                    Usuarios
                    <v-flex xs3 sm2 md1 pl-2>
                        <v-btn fab small dark color="green" @click.stop="dialog = !dialog">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex xs6 sm3 md3>
                        <v-text-field 
                            v-model="search" 
                            append-icon="search" 
                            label="Buscar" 
                            single-line 
                            hide-details
                        ></v-text-field>
                    </v-flex>
                </v-card-title>
                <v-data-table 
                    :headers="headersUsuarios" 
                    :items="usuarios" 
                    hide-actions 
                    :search="search"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.index + 1 }}</td>
                        <td class="text-xs-left">{{ props.item.nombre }}</td>
                        <td class="text-xs-left">{{ props.item.email }}</td>
                        <td class="text-xs-left">{{ props.item.tipo }}</td>
                        <td class="text-xs-left">{{ props.item.permisos }}</td>
                        <td class="">
                            <v-flex>
                                <v-switch v-model="props.item.activo" hide-details class="mt-2" color="green"></v-switch>
                            </v-flex>                                                            
                        </td>
                        <!-- <td class="text-xs-center">{{ props.item.activo }}</td> -->
                        <td class="justify-center layout px-0">
                            <v-btn flat icon color="teal" @click="editarId(props.item.idUsuario)">
                                <v-icon dark>edit</v-icon>
                            </v-btn>
                            <v-btn flat icon color="red" @click="modalEliminar(props.item.idUsuario)">
                                <v-icon dark>delete</v-icon>
                            </v-btn>
                        </td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        No se encontró ninguna coincidencia para "{{ search }}".
                    </v-alert>
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
                {{ nuevo ? "Nuevo Usuario" : "Editar Usuario" }}
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-text-field v-model="usuario.nombre" prepend-icon="person" placeholder="Nombre"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="usuario.email" prepend-icon="email" placeholder="Correo"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="usuario.tipo" prepend-icon="group" placeholder="Tipo"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field v-model="usuario.permisos" prepend-icon="tune" placeholder="Permisos"></v-text-field>
                    </v-flex>
                    <template v-if="nuevo">
                        <v-flex xs12>
                            <v-text-field v-model="usuario.password" prepend-icon="lock" placeholder="Password"></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-text-field v-model="usuario.rePassword" prepend-icon="lock" placeholder="Re-Password"></v-text-field>
                        </v-flex>
                    </template>
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
      usuarios: [],
      usuario: {},
      headersUsuarios: [
        {
          text: "#",
          align: "left",
          sortable: false,
          value: "index"
        },
        {
          text: "Nombre",
          align: "left",
          value: "nombre"
        },

        {
          text: "Correo",
          align: "left",
          value: "email"
        },
        {
          text: "Tipo",
          align: "left",
          value: "tipo"
        },
        {
          text: "Permisos",
          align: "left",
          value: "permisos"
        },
        {
          text: "Activo",
          align: "left",
          value: "activo"
        },
        {
          text: "Acciones",
          align: "center",
          sortable: false,
          value: "acciones"
        }
      ]
    };
  },
  watch: {
    dialog: function() {
      if (!this.dialog) {
        this.nuevo = true;
        this.usuario = {};
      }
    }
  },
  created() {
    this.getUsuarios();
  },
  methods: {
    getUsuarios() {
      this.axios
        .get("/usuarios")
        .then(res => {
          this.usuarios = res.data;
        })
        .catch(err => {
          this.mensaje = err.response.data.msg;
          this.colorSnack = "red darken-4";
          this.snackbar = true;
        });
    },
    guardar() {
      this.axios
        .post("/usuarios", {
          usuario: this.usuario
        })
        .then(res => {
          this.dialog = false;
          this.getUsuarios();
        })
        .catch(err => {
          this.mensaje = err.response.data.msg;
          this.colorSnack = "red darken-4";
          this.snackbar = true;
        });
    },
    modalEliminar(id) {
      this.eliminarId = id;
      this.dialogEliminar = true;
    },
    eliminar(respuesta) {
      this.dialogEliminar = false;
      if (respuesta) {
        this.axios
          .delete("/usuarios/" + this.eliminarId)
          .then(res => {
            this.getUsuarios();
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
        .get("/usuarios/" + id)
        .then(res => {
          this.usuario = res.data;
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
        .patch("/usuarios/" + this.usuario.idUsuario, {
          usuario: this.usuario
        })
        .then(res => {
          this.dialog = false;
          this.getUsuarios();
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
