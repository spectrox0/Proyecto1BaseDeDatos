const Proveedor = require("../models/proveedor");

<<<<<<< HEAD
exports.getAllProveedores = async (req, res) => {
    try {
        let proveedores = await Proveedores.findAll();
        proveedores = proveedores.map(val => val.dataValues);
        if (!!proveedores) return res.render("proveedores", { proveedores, pasajes });
    } catch (error) {
        res.render("mensajeError", { message: " Ha ocurrido un error no se han podido cargar los proveedores", dir: "index" })
=======

exports.getAllProveedores = async (req, res) => {
    try {
        let proveedores = await Proveedor.findAll();
        proveedores = proveedores.map(val => val.dataValues);
        if (!!proveedores) 
        return res.render("proveedores", { proveedores});
    } catch (error) {
        res.render("mensajeError", { message: " Ha ocurrido un error no se han podido cargar los proveedores", dir: "proveedores" })
>>>>>>> 19803b2457ee8ab59b480aa9d3dbd449ac7acffd
    }

}
exports.create = async (req, res) => {

<<<<<<< HEAD

=======
    try{ 
>>>>>>> 19803b2457ee8ab59b480aa9d3dbd449ac7acffd
    const proveedor = await Proveedor.build({
        nombre: req.body.nombre,
        tiempo_de_respuesta: req.body.tiempo_de_respuesta,
    });
    await proveedor.save();
    if (!!proveedor) {
        return res.redirect("/proveedores");
<<<<<<< HEAD
=======
    } }catch(error) {

        res.render("mensajeError", { message: " Ha ocurrido un error no se han podido cargar los proveedores", dir: "provedores" })

>>>>>>> 19803b2457ee8ab59b480aa9d3dbd449ac7acffd
    }

};


exports.update = async (req, res) => {

    try {

        let response = await Proveedor.update({
            nombre: req.body.nombre,
            tiempo_de_respuesta: req.body.tiempo_de_respuesta,
        }, {
                where: {
                    C_proveedor: C_proveedor
                }
            })

        if (!!response)
            res.redirect("/proveedores");

    } catch (error) {
        res.render("mensajeError", { message: " Ha ocurrido un error no se han podidio actualizar el proveedor", dir: "index" })
    }
}
exports.delete = async (req, res) => {
    const C_proveedor = C_proveedor;
    try {
        const response = await Proveedor.destroy({

            where: {
                C_proveedor: C_proveedor
            }
        });
        if (!!response) {
            return res.redirect("/proveedores");
        }
        else return res.render("mensajeError", { message: "No se pudo eliminar el Proveedor", dir: "proveedores" });

    } catch (error) {
        return res.render("mensajeError", { message: "No se pudo eliminar el Proveedor", dir: "proveedores" });

    }
};