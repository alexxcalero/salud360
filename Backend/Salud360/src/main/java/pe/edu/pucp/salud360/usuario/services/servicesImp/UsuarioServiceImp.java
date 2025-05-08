package pe.edu.pucp.salud360.usuario.services.servicesImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pe.edu.pucp.salud360.usuario.controllers.RolController;
import pe.edu.pucp.salud360.usuario.controllers.TipoDocumentoController;
import pe.edu.pucp.salud360.usuario.dto.RolDTO;
import pe.edu.pucp.salud360.usuario.dto.TipoDocumentoDTO;
import pe.edu.pucp.salud360.usuario.dto.UsuarioDTO;
import pe.edu.pucp.salud360.usuario.mappers.UsuarioMapper;
import pe.edu.pucp.salud360.usuario.models.Rol;
import pe.edu.pucp.salud360.usuario.models.TipoDocumento;
import pe.edu.pucp.salud360.usuario.models.Usuario;
import pe.edu.pucp.salud360.usuario.repositories.UsuarioRepository;
import pe.edu.pucp.salud360.usuario.services.UsuarioService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImp implements UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TipoDocumentoController tipoDocumentoController;

    @Autowired
    private RolController rolController;

    @Override
    public UsuarioDTO crearUsuario(UsuarioDTO usuarioDTO) {
        Usuario usuario = UsuarioMapper.mapToModel(usuarioDTO);
        usuario.setActivo(true);

        TipoDocumentoDTO tipoDocumentoDTO = tipoDocumentoController.buscarTipoDocumentoPorId(usuarioDTO.getTipoDocumento()).getBody();
        TipoDocumento tipoDocumento = new TipoDocumento();
        tipoDocumento.setIdTipoDocumento(tipoDocumentoDTO.getIdTipoDocumento());

        RolDTO rolDTO = rolController.buscarRolPorId(usuarioDTO.getRol()).getBody();
        Rol rol = new Rol();
        rol.setIdRol(rolDTO.getIdRol());

        usuario.setRol(rol);
        usuario.setTipoDocumento(tipoDocumento);

        usuario.setFechaCreacion(LocalDateTime.now());
        Usuario usuarioCreado = usuarioRepository.save(usuario);
        return UsuarioMapper.mapToDTO(usuarioCreado);
    }

    @Override
    public UsuarioDTO actualizarUsuario(Integer idUsuario, UsuarioDTO usuarioDTO) {
        if(usuarioRepository.findById(idUsuario).isPresent()){
            TipoDocumentoDTO tipoDocumentoDTO = tipoDocumentoController.buscarTipoDocumentoPorId(usuarioDTO.getTipoDocumento()).getBody();
            TipoDocumento tipoDocumento = new TipoDocumento();
            tipoDocumento.setIdTipoDocumento(tipoDocumentoDTO.getIdTipoDocumento());

            RolDTO rolDTO = rolController.buscarRolPorId(usuarioDTO.getRol()).getBody();
            Rol rol = new Rol();
            rol.setIdRol(rolDTO.getIdRol());

            Usuario usuario = usuarioRepository.findById(idUsuario).get();
            usuario.setNombres(usuarioDTO.getNombres());
            usuario.setApellidos(usuarioDTO.getApellidos());
            usuario.setNumeroDocumento(usuarioDTO.getNumeroDocumento());
            usuario.setTelefono(usuarioDTO.getTelefono());
            usuario.setFechaNacimiento(usuarioDTO.getFechaNacimiento());
            usuario.setTipoDocumento(tipoDocumento);
            usuario.setRol(rol);
            Usuario usuarioActualizado = usuarioRepository.save(usuario);
            return UsuarioMapper.mapToDTO(usuarioActualizado);
        } else {
            return null;
        }
    }

    @Override
    public void eliminarUsuario(Integer idUsuario) {
        Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);
        if(usuario.isPresent()) {
            Usuario usuarioEliminar = usuario.get();
            usuarioEliminar.setActivo(false);  // Es una eliminacion logica
            usuarioEliminar.setFechaDesactivacion(LocalDateTime.now());
            usuarioRepository.save(usuarioEliminar);
        }
    }

    @Override
    public List<UsuarioDTO> listarUsuariosTodos() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        if(usuarios.isEmpty()) {
            return null;
        } else {
            return usuarios.stream().map(UsuarioMapper::mapToDTO).toList();
        }
    }

    @Override
    public UsuarioDTO buscarUsuarioPorId(Integer idUsuario) {
        if(usuarioRepository.findById(idUsuario).isPresent()) {
            Usuario usuarioBuscado = usuarioRepository.findById(idUsuario).get();
            return UsuarioMapper.mapToDTO(usuarioBuscado);
        } else {
            return null;
        }
    }
}
