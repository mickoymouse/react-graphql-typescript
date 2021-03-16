import {
  Resolver,
  Ctx,
  Arg,
  Mutation,
  Field,
  InputType,
  ObjectType,
} from "type-graphql";
import { MyContext } from "../types";
import argon2 from "argon2";
import { User } from "../entities/User";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "Username must be atleast 3 characters.",
          },
        ],
      };
    }

    if (options.password.length <= 5) {
      return {
        errors: [
          {
            field: "password",
            message: "Password must be atleast 6 characters.",
          },
        ],
      };
    }

    const isExisting = await em.findOne(User, { userName: options.username });
    if (isExisting) {
      return {
        errors: [
          {
            field: "username",
            message: "Username already exists.",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      userName: options.username,
      password: hashedPassword,
    });
    await em.persistAndFlush(user);
    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { userName: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "Username doesn't exist.",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Invalid password.",
          },
        ],
      };
    }

    return {
      user,
    };
  }
}
