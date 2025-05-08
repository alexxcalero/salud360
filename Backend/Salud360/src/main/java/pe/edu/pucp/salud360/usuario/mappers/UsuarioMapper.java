package pe.edu.pucp.salud360.usuario.mappers;

import org.springframework.web.bind.annotation.Mapping;
import pe.edu.pucp.salud360.usuario.controllers.TipoDocumentoController;
import pe.edu.pucp.salud360.usuario.dto.TipoDocumentoDTO;
import pe.edu.pucp.salud360.usuario.dto.UsuarioDTO;
import pe.edu.pucp.salud360.usuario.models.TipoDocumento;
import pe.edu.pucp.salud360.usuario.models.Usuario;

public class UsuarioMapper {
    public static UsuarioDTO mapToDTO(Usuario usuario) {
        if(usuario == null)
            return null;

        return new UsuarioDTO(usuario.getIdUsuario(), usuario.getNombres(), usuario.getApellidos(),
                              usuario.getNumeroDocumento(), usuario.getCorreo(), usuario.getContrasenha(),
                              usuario.getTelefono(), usuario.getFechaNacimiento(), usuario.getActivo(),
                              usuario.getTipoDocumento().getIdTipoDocumento(), usuario.getRol().getIdRol());
    }


    public static Usuario mapToModel(UsuarioDTO usuarioDTO) {
        if(usuarioDTO == null)
            return null;

        return new Usuario(usuarioDTO.getIdUsuario(), usuarioDTO.getNombres(), usuarioDTO.getApellidos(),
                           usuarioDTO.getNumeroDocumento(), usuarioDTO.getCorreo(), usuarioDTO.getContrasenha(), usuarioDTO.getTelefono(),
                           usuarioDTO.getFechaNacimiento(), usuarioDTO.getActivo());
    }
}
