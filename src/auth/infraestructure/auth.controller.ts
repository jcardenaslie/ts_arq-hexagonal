import { AuthUseCase } from '../application/auth.usecase';
import { User } from '../../user/domain/entities/user.entity';

export class AuthController {
	constructor(private readonly authUseCase: AuthUseCase) {}

	async login(user: User) {
		return this.authUseCase.login(user);
	}
}
