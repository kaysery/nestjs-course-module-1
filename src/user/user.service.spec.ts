import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a user', async () => {
      //create a userDto object
      const userDto = {
        name: 'test',
        email: 'test@hormail.com',
        password: 'test',
      };

      const createdUser = await service.create(userDto);

      expect(createdUser.name).toEqual(userDto.name);
      expect(createdUser.email).toEqual(userDto.email);
      expect(createdUser.password).toEqual(userDto.password);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const userDto = {
        name: 'test',
        email: 'test@hormail.com',
        password: 'test',
      };

      const createdUser = await service.create(userDto);

      expect(createdUser.name).toEqual(userDto.name);
      expect(createdUser.email).toEqual(userDto.email);
      expect(createdUser.password).toEqual(userDto.password);
      expect(await service.findAll()).toBeInstanceOf(Array);
      expect(await service.findAll()).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const userDto = {
        name: 'test',
        email: 'test@hormail.com',
        password: 'test',
      };

      const createdUser = await service.create(userDto);

      expect(createdUser.name).toEqual(userDto.name);
      expect(createdUser.email).toEqual(userDto.email);
      expect(createdUser.password).toEqual(userDto.password);

      expect(await service.findOne(createdUser.id)).toBe(createdUser);
    });
  });
});
