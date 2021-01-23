import { Role } from '../../role/domain/entities/role.entity';
import { RoleTokenRepository } from '../domain/repositories/roleToken.repository';

const RoleTokenDto = (roles: Role[]): RoleTokenRepository[] => {
	const rolesToken: RoleTokenRepository[] = roles.map(role => {
		const roleToken: RoleTokenRepository = { name: role.name };
		return roleToken;
	});

	return rolesToken;
};

export { RoleTokenDto };
