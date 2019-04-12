type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Represents a date in time */
  Date: any;
};

export type AdditionalEntityFields = {
  readonly path?: Maybe<Scalars["String"]>;
  readonly type?: Maybe<Scalars["String"]>;
};

export type AuthResult = {
  readonly accessToken: Scalars["String"];
  readonly idToken: Scalars["String"];
  readonly tokenType: Scalars["String"];
  readonly expiresIn: Scalars["Int"];
};

export type Card = {
  readonly id: Scalars["ID"];
  readonly translation: Scalars["String"];
  readonly meaning: Scalars["String"];
  readonly pronunciation?: Maybe<Scalars["String"]>;
  readonly audioUrl?: Maybe<Scalars["String"]>;
  readonly deck?: Maybe<Deck>;
};

export type CardFilterInput = {
  readonly limit?: Maybe<Scalars["Int"]>;
  readonly offset?: Maybe<Scalars["Int"]>;
  readonly sortDirection?: Maybe<SortDirection>;
  readonly sortBy?: Maybe<CardSortingOptions>;
};

export type CardInput = {
  readonly translation?: Maybe<Scalars["String"]>;
  readonly meaning?: Maybe<Scalars["String"]>;
  readonly pronunciation?: Maybe<Scalars["String"]>;
  readonly audioUrl?: Maybe<Scalars["String"]>;
  readonly deck?: Maybe<Scalars["ID"]>;
};

export type CardSortingOptions = "meaning" | "pronunciation" | "translation";

export type Deck = {
  readonly id: Scalars["ID"];
  readonly name: Scalars["String"];
  readonly owner: User;
  readonly language: Language;
  readonly nativeLanguage: Language;
  readonly cards?: Maybe<ReadonlyArray<Maybe<Card>>>;
  readonly cardCount: Scalars["Int"];
  readonly subscribers?: Maybe<ReadonlyArray<Maybe<User>>>;
  readonly subscriberCount: Scalars["Int"];
  readonly rating: Scalars["Int"];
  readonly isLikedBy: Scalars["Boolean"];
};

export type DeckCardsArgs = {
  filter?: Maybe<CardFilterInput>;
};

export type DeckSubscribersArgs = {
  filter?: Maybe<SubscriberFilterInput>;
};

export type DeckIsLikedByArgs = {
  userID: Scalars["ID"];
};

export type DeckFilterInput = {
  readonly limit?: Maybe<Scalars["Int"]>;
  readonly sortBy?: Maybe<DeckSortBy>;
  readonly sortDirection?: Maybe<SortDirection>;
  readonly search?: Maybe<Scalars["String"]>;
  readonly owner?: Maybe<Scalars["ID"]>;
  readonly languages?: Maybe<ReadonlyArray<Maybe<Scalars["ID"]>>>;
  readonly nativeLanguage?: Maybe<Scalars["ID"]>;
  readonly cardContained?: Maybe<Scalars["ID"]>;
};

export type DeckInput = {
  readonly name?: Maybe<Scalars["String"]>;
  readonly owner?: Maybe<Scalars["String"]>;
  readonly language?: Maybe<Scalars["ID"]>;
  readonly nativeLanguage?: Maybe<Scalars["ID"]>;
  readonly cards?: Maybe<ReadonlyArray<Maybe<CardInput>>>;
};

export type DeckSortBy = "name" | "cardCount" | "rating" | "subscribers";

export type Identity = {
  readonly userId: Scalars["ID"];
  readonly provider: Scalars["String"];
  readonly connection: Scalars["String"];
  readonly isSocial: Scalars["Boolean"];
};

export type Language = {
  readonly id: Scalars["ID"];
  readonly name: Scalars["String"];
  readonly nativeName: Scalars["String"];
  readonly languageCode: Scalars["String"];
};

export type Mutation = {
  readonly authenticate?: Maybe<AuthResult>;
  readonly logout?: Maybe<Scalars["Boolean"]>;
  readonly initUser?: Maybe<User>;
  readonly editUser?: Maybe<User>;
  readonly deleteUser?: Maybe<User>;
  readonly addLanguageToUser?: Maybe<User>;
  readonly addDeck?: Maybe<User>;
  readonly updateDeck?: Maybe<Deck>;
  readonly deleteDeck?: Maybe<Deck>;
  readonly changeSubscriptionStatus?: Maybe<User>;
  readonly changeLikeStatus?: Maybe<Deck>;
  readonly createCard?: Maybe<Deck>;
  readonly editCard?: Maybe<Card>;
  readonly deleteCards?: Maybe<Deck>;
  readonly submitReview?: Maybe<Review>;
};

export type MutationAuthenticateArgs = {
  code: Scalars["ID"];
};

export type MutationInitUserArgs = {
  id: Scalars["ID"];
};

export type MutationEditUserArgs = {
  id: Scalars["ID"];
  input: UserInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"];
};

export type MutationAddLanguageToUserArgs = {
  id: Scalars["ID"];
  input: Scalars["ID"];
};

export type MutationAddDeckArgs = {
  input: DeckInput;
};

export type MutationUpdateDeckArgs = {
  id: Scalars["ID"];
  input: DeckInput;
};

export type MutationDeleteDeckArgs = {
  id: Scalars["ID"];
};

export type MutationChangeSubscriptionStatusArgs = {
  id: Scalars["ID"];
  deckID: Scalars["ID"];
  value: Scalars["Boolean"];
};

export type MutationChangeLikeStatusArgs = {
  id: Scalars["ID"];
  userID: Scalars["ID"];
  value?: Maybe<Scalars["Boolean"]>;
};

export type MutationCreateCardArgs = {
  input: CardInput;
};

export type MutationEditCardArgs = {
  id: Scalars["ID"];
  input: CardInput;
};

export type MutationDeleteCardsArgs = {
  deck: Scalars["ID"];
  ids: ReadonlyArray<Maybe<Scalars["ID"]>>;
};

export type MutationSubmitReviewArgs = {
  id: Scalars["ID"];
  correct: Scalars["Boolean"];
  field: ReviewFields;
};

export type Query = {
  readonly users?: Maybe<ReadonlyArray<Maybe<User>>>;
  readonly user?: Maybe<User>;
  readonly languages?: Maybe<ReadonlyArray<Maybe<Language>>>;
  readonly language?: Maybe<Language>;
  readonly decks?: Maybe<ReadonlyArray<Maybe<Deck>>>;
  readonly deck?: Maybe<Deck>;
  readonly review?: Maybe<Review>;
};

export type QueryUsersArgs = {
  filter?: Maybe<UserFilterInput>;
};

export type QueryUserArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type QueryLanguageArgs = {
  languageCode: Scalars["String"];
};

export type QueryDecksArgs = {
  filter?: Maybe<DeckFilterInput>;
};

export type QueryDeckArgs = {
  id: Scalars["ID"];
};

export type QueryReviewArgs = {
  id: Scalars["ID"];
};

export type Review = {
  readonly id: Scalars["ID"];
  readonly nextReviewAt?: Maybe<Scalars["Date"]>;
  readonly box: Scalars["Int"];
  readonly card: Card;
  readonly user: User;
  readonly reviewedFields?: Maybe<ReadonlyArray<Maybe<ReviewFields>>>;
};

export type ReviewFields = "meaning" | "pronunciation" | "translation";

export type ReviewFilterInput = {
  readonly limit?: Maybe<Scalars["Int"]>;
  readonly offset?: Maybe<Scalars["Int"]>;
  readonly deck?: Maybe<Scalars["ID"]>;
  readonly toBeReviewedBy?: Maybe<Scalars["Date"]>;
  readonly sortBy?: Maybe<ReviewSortOptions>;
  readonly sortDirection?: Maybe<SortDirection>;
  readonly box?: Maybe<Scalars["Int"]>;
};

export type ReviewSortOptions = "reviewDate";

export type SortDirection = "asc" | "desc";

export type SubscriberFilterInput = {
  readonly limit?: Maybe<Scalars["Int"]>;
};

export type User = {
  readonly sub?: Maybe<Scalars["ID"]>;
  readonly id: Scalars["ID"];
  readonly email?: Maybe<Scalars["String"]>;
  readonly name?: Maybe<Scalars["String"]>;
  readonly username: Scalars["String"];
  readonly picture: Scalars["String"];
  readonly gender: Scalars["String"];
  readonly locale?: Maybe<Scalars["String"]>;
  readonly identities?: Maybe<ReadonlyArray<Maybe<Identity>>>;
  readonly isSocial: Scalars["Boolean"];
  readonly nativeLanguage?: Maybe<Language>;
  readonly languages?: Maybe<ReadonlyArray<Maybe<Language>>>;
  readonly ownedDecks?: Maybe<ReadonlyArray<Maybe<Deck>>>;
  readonly subscribedDecks?: Maybe<ReadonlyArray<Maybe<Deck>>>;
  readonly reviewQueue?: Maybe<ReadonlyArray<Maybe<Review>>>;
  readonly reviewsCount?: Maybe<Scalars["Int"]>;
  readonly nextReview?: Maybe<Review>;
  readonly lessonQueue?: Maybe<ReadonlyArray<Maybe<Review>>>;
  readonly lessonsCount?: Maybe<Scalars["Int"]>;
  readonly introStep?: Maybe<Scalars["Int"]>;
};

export type UserReviewQueueArgs = {
  filter?: Maybe<ReviewFilterInput>;
};

export type UserReviewsCountArgs = {
  filter?: Maybe<ReviewFilterInput>;
};

export type UserLessonQueueArgs = {
  filter?: Maybe<ReviewFilterInput>;
};

export type UserFilterInput = {
  readonly limit?: Maybe<Scalars["Int"]>;
};

export type UserInput = {
  readonly name?: Maybe<Scalars["String"]>;
  readonly username?: Maybe<Scalars["String"]>;
  readonly email?: Maybe<Scalars["String"]>;
  readonly password?: Maybe<Scalars["String"]>;
  readonly oldPassword?: Maybe<Scalars["String"]>;
  readonly introStep?: Maybe<Scalars["Int"]>;
  readonly nativeLanguage?: Maybe<Scalars["ID"]>;
};
import { AppContext } from "../common/server";

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export type UnionDirectiveResolver<
  Result,
  Parent,
  Context = AppContext,
  Args = {
    discriminatorField?: Maybe<Maybe<Scalars["String"]>>;
    additionalFields?: Maybe<Maybe<Array<Maybe<AdditionalEntityFields>>>>;
  }
> = DirectiveResolverFn<Result, Parent, Context, Args>;

export type AbstractEntityDirectiveResolver<
  Result,
  Parent,
  Context = AppContext,
  Args = {
    discriminatorField?: Maybe<Scalars["String"]>;
    additionalFields?: Maybe<Maybe<Array<Maybe<AdditionalEntityFields>>>>;
  }
> = DirectiveResolverFn<Result, Parent, Context, Args>;

export type EntityDirectiveResolver<
  Result,
  Parent,
  Context = AppContext,
  Args = {
    embedded?: Maybe<Maybe<Scalars["Boolean"]>>;
    additionalFields?: Maybe<Maybe<Array<Maybe<AdditionalEntityFields>>>>;
  }
> = DirectiveResolverFn<Result, Parent, Context, Args>;

export type ColumnDirectiveResolver<
  Result,
  Parent,
  Context = AppContext,
  Args = { overrideType?: Maybe<Maybe<Scalars["String"]>> }
> = DirectiveResolverFn<Result, Parent, Context, Args>;

export type IdDirectiveResolver<
  Result,
  Parent,
  Context = AppContext,
  Args = {}
> = DirectiveResolverFn<Result, Parent, Context, Args>;

export type LinkDirectiveResolver<
  Result,
  Parent,
  Context = AppContext,
  Args = {}
> = DirectiveResolverFn<Result, Parent, Context, Args>;

export type EmbeddedDirectiveResolver<
  Result,
  Parent,
  Context = AppContext,
  Args = {}
> = DirectiveResolverFn<Result, Parent, Context, Args>;

export type MapDirectiveResolver<
  Result,
  Parent,
  Context = AppContext,
  Args = { path?: Maybe<Scalars["String"]> }
> = DirectiveResolverFn<Result, Parent, Context, Args>;

export type AuthResultResolvers<
  Context = AppContext,
  ParentType = AuthResult
> = {
  accessToken?: Resolver<Scalars["String"], ParentType, Context>;
  idToken?: Resolver<Scalars["String"], ParentType, Context>;
  tokenType?: Resolver<Scalars["String"], ParentType, Context>;
  expiresIn?: Resolver<Scalars["Int"], ParentType, Context>;
};

export type CardResolvers<Context = AppContext, ParentType = Card> = {
  id?: Resolver<Scalars["ID"], ParentType, Context>;
  translation?: Resolver<Scalars["String"], ParentType, Context>;
  meaning?: Resolver<Scalars["String"], ParentType, Context>;
  pronunciation?: Resolver<Maybe<Scalars["String"]>, ParentType, Context>;
  audioUrl?: Resolver<Maybe<Scalars["String"]>, ParentType, Context>;
  deck?: Resolver<Maybe<Deck>, ParentType, Context>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<Scalars["Date"], any> {
  name: "Date";
}

export type DeckResolvers<Context = AppContext, ParentType = Deck> = {
  id?: Resolver<Scalars["ID"], ParentType, Context>;
  name?: Resolver<Scalars["String"], ParentType, Context>;
  owner?: Resolver<User, ParentType, Context>;
  language?: Resolver<Language, ParentType, Context>;
  nativeLanguage?: Resolver<Language, ParentType, Context>;
  cards?: Resolver<
    Maybe<ReadonlyArray<Maybe<Card>>>,
    ParentType,
    Context,
    DeckCardsArgs
  >;
  cardCount?: Resolver<Scalars["Int"], ParentType, Context>;
  subscribers?: Resolver<
    Maybe<ReadonlyArray<Maybe<User>>>,
    ParentType,
    Context,
    DeckSubscribersArgs
  >;
  subscriberCount?: Resolver<Scalars["Int"], ParentType, Context>;
  rating?: Resolver<Scalars["Int"], ParentType, Context>;
  isLikedBy?: Resolver<
    Scalars["Boolean"],
    ParentType,
    Context,
    DeckIsLikedByArgs
  >;
};

export type IdentityResolvers<Context = AppContext, ParentType = Identity> = {
  userId?: Resolver<Scalars["ID"], ParentType, Context>;
  provider?: Resolver<Scalars["String"], ParentType, Context>;
  connection?: Resolver<Scalars["String"], ParentType, Context>;
  isSocial?: Resolver<Scalars["Boolean"], ParentType, Context>;
};

export type LanguageResolvers<Context = AppContext, ParentType = Language> = {
  id?: Resolver<Scalars["ID"], ParentType, Context>;
  name?: Resolver<Scalars["String"], ParentType, Context>;
  nativeName?: Resolver<Scalars["String"], ParentType, Context>;
  languageCode?: Resolver<Scalars["String"], ParentType, Context>;
};

export type MutationResolvers<Context = AppContext, ParentType = Mutation> = {
  authenticate?: Resolver<
    Maybe<AuthResult>,
    ParentType,
    Context,
    MutationAuthenticateArgs
  >;
  logout?: Resolver<Maybe<Scalars["Boolean"]>, ParentType, Context>;
  initUser?: Resolver<Maybe<User>, ParentType, Context, MutationInitUserArgs>;
  editUser?: Resolver<Maybe<User>, ParentType, Context, MutationEditUserArgs>;
  deleteUser?: Resolver<
    Maybe<User>,
    ParentType,
    Context,
    MutationDeleteUserArgs
  >;
  addLanguageToUser?: Resolver<
    Maybe<User>,
    ParentType,
    Context,
    MutationAddLanguageToUserArgs
  >;
  addDeck?: Resolver<Maybe<User>, ParentType, Context, MutationAddDeckArgs>;
  updateDeck?: Resolver<
    Maybe<Deck>,
    ParentType,
    Context,
    MutationUpdateDeckArgs
  >;
  deleteDeck?: Resolver<
    Maybe<Deck>,
    ParentType,
    Context,
    MutationDeleteDeckArgs
  >;
  changeSubscriptionStatus?: Resolver<
    Maybe<User>,
    ParentType,
    Context,
    MutationChangeSubscriptionStatusArgs
  >;
  changeLikeStatus?: Resolver<
    Maybe<Deck>,
    ParentType,
    Context,
    MutationChangeLikeStatusArgs
  >;
  createCard?: Resolver<
    Maybe<Deck>,
    ParentType,
    Context,
    MutationCreateCardArgs
  >;
  editCard?: Resolver<Maybe<Card>, ParentType, Context, MutationEditCardArgs>;
  deleteCards?: Resolver<
    Maybe<Deck>,
    ParentType,
    Context,
    MutationDeleteCardsArgs
  >;
  submitReview?: Resolver<
    Maybe<Review>,
    ParentType,
    Context,
    MutationSubmitReviewArgs
  >;
};

export type QueryResolvers<Context = AppContext, ParentType = Query> = {
  users?: Resolver<
    Maybe<ReadonlyArray<Maybe<User>>>,
    ParentType,
    Context,
    QueryUsersArgs
  >;
  user?: Resolver<Maybe<User>, ParentType, Context, QueryUserArgs>;
  languages?: Resolver<
    Maybe<ReadonlyArray<Maybe<Language>>>,
    ParentType,
    Context
  >;
  language?: Resolver<Maybe<Language>, ParentType, Context, QueryLanguageArgs>;
  decks?: Resolver<
    Maybe<ReadonlyArray<Maybe<Deck>>>,
    ParentType,
    Context,
    QueryDecksArgs
  >;
  deck?: Resolver<Maybe<Deck>, ParentType, Context, QueryDeckArgs>;
  review?: Resolver<Maybe<Review>, ParentType, Context, QueryReviewArgs>;
};

export type ReviewResolvers<Context = AppContext, ParentType = Review> = {
  id?: Resolver<Scalars["ID"], ParentType, Context>;
  nextReviewAt?: Resolver<Maybe<Scalars["Date"]>, ParentType, Context>;
  box?: Resolver<Scalars["Int"], ParentType, Context>;
  card?: Resolver<Card, ParentType, Context>;
  user?: Resolver<User, ParentType, Context>;
  reviewedFields?: Resolver<
    Maybe<ReadonlyArray<Maybe<ReviewFields>>>,
    ParentType,
    Context
  >;
};

export type UserResolvers<Context = AppContext, ParentType = User> = {
  sub?: Resolver<Maybe<Scalars["ID"]>, ParentType, Context>;
  id?: Resolver<Scalars["ID"], ParentType, Context>;
  email?: Resolver<Maybe<Scalars["String"]>, ParentType, Context>;
  name?: Resolver<Maybe<Scalars["String"]>, ParentType, Context>;
  username?: Resolver<Scalars["String"], ParentType, Context>;
  picture?: Resolver<Scalars["String"], ParentType, Context>;
  gender?: Resolver<Scalars["String"], ParentType, Context>;
  locale?: Resolver<Maybe<Scalars["String"]>, ParentType, Context>;
  identities?: Resolver<
    Maybe<ReadonlyArray<Maybe<Identity>>>,
    ParentType,
    Context
  >;
  isSocial?: Resolver<Scalars["Boolean"], ParentType, Context>;
  nativeLanguage?: Resolver<Maybe<Language>, ParentType, Context>;
  languages?: Resolver<
    Maybe<ReadonlyArray<Maybe<Language>>>,
    ParentType,
    Context
  >;
  ownedDecks?: Resolver<Maybe<ReadonlyArray<Maybe<Deck>>>, ParentType, Context>;
  subscribedDecks?: Resolver<
    Maybe<ReadonlyArray<Maybe<Deck>>>,
    ParentType,
    Context
  >;
  reviewQueue?: Resolver<
    Maybe<ReadonlyArray<Maybe<Review>>>,
    ParentType,
    Context,
    UserReviewQueueArgs
  >;
  reviewsCount?: Resolver<
    Maybe<Scalars["Int"]>,
    ParentType,
    Context,
    UserReviewsCountArgs
  >;
  nextReview?: Resolver<Maybe<Review>, ParentType, Context>;
  lessonQueue?: Resolver<
    Maybe<ReadonlyArray<Maybe<Review>>>,
    ParentType,
    Context,
    UserLessonQueueArgs
  >;
  lessonsCount?: Resolver<Maybe<Scalars["Int"]>, ParentType, Context>;
  introStep?: Resolver<Maybe<Scalars["Int"]>, ParentType, Context>;
};

export type Resolvers<Context = AppContext> = {
  AuthResult?: AuthResultResolvers<Context>;
  Card?: CardResolvers<Context>;
  Date?: GraphQLScalarType;
  Deck?: DeckResolvers<Context>;
  Identity?: IdentityResolvers<Context>;
  Language?: LanguageResolvers<Context>;
  Mutation?: MutationResolvers<Context>;
  Query?: QueryResolvers<Context>;
  Review?: ReviewResolvers<Context>;
  User?: UserResolvers<Context>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<Context = AppContext> = Resolvers<Context>;
export type DirectiveResolvers<Context = AppContext> = {
  union?: UnionDirectiveResolver<any, any, Context>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, Context>;
  entity?: EntityDirectiveResolver<any, any, Context>;
  column?: ColumnDirectiveResolver<any, any, Context>;
  id?: IdDirectiveResolver<any, any, Context>;
  link?: LinkDirectiveResolver<any, any, Context>;
  embedded?: EmbeddedDirectiveResolver<any, any, Context>;
  map?: MapDirectiveResolver<any, any, Context>;
};

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<Context = AppContext> = DirectiveResolvers<
  Context
>;
import { ObjectID } from "mongodb";
