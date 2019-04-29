export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Represents a date in time */
  Date: any;
  JSON: any;
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
  readonly search?: Maybe<Scalars["String"]>;
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
  readonly cards: ReadonlyArray<Card>;
  readonly cardCount: Scalars["Int"];
  readonly subscribers: ReadonlyArray<User>;
  readonly subscriberCount: Scalars["Int"];
  readonly rating: Scalars["Int"];
  readonly isLikedBy: Scalars["Boolean"];
  readonly tags: ReadonlyArray<Scalars["String"]>;
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
  readonly offset?: Maybe<Scalars["Int"]>;
  readonly sortBy?: Maybe<DeckSortBy>;
  readonly sortDirection?: Maybe<SortDirection>;
  readonly search?: Maybe<Scalars["String"]>;
  readonly owner?: Maybe<Scalars["ID"]>;
  readonly languages?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  readonly nativeLanguage?: Maybe<Scalars["ID"]>;
  readonly tags?: Maybe<ReadonlyArray<Scalars["String"]>>;
};

export type DeckInput = {
  readonly name?: Maybe<Scalars["String"]>;
  readonly owner?: Maybe<Scalars["String"]>;
  readonly language?: Maybe<Scalars["ID"]>;
  readonly nativeLanguage?: Maybe<Scalars["ID"]>;
  readonly cards?: Maybe<ReadonlyArray<Maybe<CardInput>>>;
};

export type DeckSortBy = "name" | "cardCount" | "rating" | "subscriberCount";

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
  readonly hasConverter: Scalars["Boolean"];
  readonly requiresIME: Scalars["Boolean"];
  readonly hasPronunciation: Scalars["Boolean"];
};

export type Mutation = {
  readonly authenticate?: Maybe<AuthResult>;
  readonly logout?: Maybe<Scalars["Boolean"]>;
  readonly editUser?: Maybe<User>;
  readonly deleteUser?: Maybe<User>;
  readonly changeFollowingStatus?: Maybe<User>;
  readonly addLanguageToUser?: Maybe<User>;
  readonly removeLanguageFromUser?: Maybe<User>;
  readonly createCard?: Maybe<Deck>;
  readonly editCard?: Maybe<Card>;
  readonly deleteCards?: Maybe<Deck>;
  readonly submitReview?: Maybe<Review>;
  readonly createPost?: Maybe<ReadonlyArray<Maybe<Post>>>;
  readonly editPost?: Maybe<Post>;
  readonly deletePost?: Maybe<ReadonlyArray<Maybe<Post>>>;
  readonly addDeck?: Maybe<User>;
  readonly updateDeck?: Maybe<Deck>;
  readonly deleteDeck: User;
  readonly changeSubscriptionStatus?: Maybe<User>;
  readonly changeLikeStatus?: Maybe<Deck>;
  readonly addTagToDeck?: Maybe<Deck>;
  readonly removeTagFromDeck?: Maybe<Deck>;
};

export type MutationAuthenticateArgs = {
  code: Scalars["ID"];
};

export type MutationEditUserArgs = {
  id: Scalars["ID"];
  input: UserInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"];
};

export type MutationChangeFollowingStatusArgs = {
  id: Scalars["ID"];
  followID: Scalars["ID"];
  value: Scalars["Boolean"];
};

export type MutationAddLanguageToUserArgs = {
  id: Scalars["ID"];
  input: Scalars["ID"];
};

export type MutationRemoveLanguageFromUserArgs = {
  id: Scalars["ID"];
  language: Scalars["ID"];
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

export type MutationCreatePostArgs = {
  input: PostInput;
  filter?: Maybe<PostFilterInput>;
};

export type MutationEditPostArgs = {
  id: Scalars["ID"];
  input: PostInput;
};

export type MutationDeletePostArgs = {
  id: Scalars["ID"];
  filter?: Maybe<PostFilterInput>;
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

export type MutationAddTagToDeckArgs = {
  id: Scalars["ID"];
  tag: Scalars["String"];
};

export type MutationRemoveTagFromDeckArgs = {
  id: Scalars["ID"];
  tag: Scalars["String"];
};

export type Post = {
  readonly id: Scalars["ID"];
  readonly createdAt: Scalars["Date"];
  readonly type: PostType;
  readonly by: User;
  readonly content?: Maybe<Scalars["String"]>;
  readonly originalPost?: Maybe<Post>;
};

export type PostFilterInput = {
  readonly limit?: Maybe<Scalars["Int"]>;
  readonly offset?: Maybe<Scalars["Int"]>;
  readonly type?: Maybe<PostType>;
  readonly sortBy?: Maybe<PostSortOption>;
  readonly sortDirection?: Maybe<SortDirection>;
};

export type PostInput = {
  readonly type?: Maybe<PostType>;
  readonly content?: Maybe<Scalars["String"]>;
  readonly originalPost?: Maybe<Scalars["ID"]>;
};

export type PostSortOption = "likes" | "reposts" | "createdAt";

export type PostType = "post" | "repost";

export type Query = {
  readonly users?: Maybe<ReadonlyArray<Maybe<User>>>;
  readonly user?: Maybe<User>;
  readonly languages?: Maybe<ReadonlyArray<Maybe<Language>>>;
  readonly language?: Maybe<Language>;
  readonly decks?: Maybe<ReadonlyArray<Maybe<Deck>>>;
  readonly deck?: Maybe<Deck>;
  readonly tags: ReadonlyArray<Scalars["String"]>;
  readonly review?: Maybe<Review>;
};

export type QueryUsersArgs = {
  filter?: Maybe<UserFilterInput>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
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

export type QueryTagsArgs = {
  search: Scalars["String"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
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
  readonly correct?: Maybe<Scalars["Boolean"]>;
};

export type ReviewFields = "meaning" | "pronunciation" | "translation";

export type ReviewFilterInput = {
  readonly limit?: Maybe<Scalars["Int"]>;
  readonly offset?: Maybe<Scalars["Int"]>;
  readonly deck?: Maybe<Scalars["ID"]>;
  readonly toBeReviewedBy?: Maybe<Scalars["Date"]>;
  readonly sortBy?: Maybe<ReviewSortOptions>;
  readonly sortDirection?: Maybe<SortDirection>;
  readonly boxes?: Maybe<ReadonlyArray<Maybe<Scalars["Int"]>>>;
};

export type ReviewSortOptions = "reviewDate" | "box";

export type SortDirection = "asc" | "desc";

export type SubscriberFilterInput = {
  readonly limit?: Maybe<Scalars["Int"]>;
};

export type User = {
  readonly id: Scalars["ID"];
  readonly email?: Maybe<Scalars["String"]>;
  readonly name?: Maybe<Scalars["String"]>;
  readonly username: Scalars["String"];
  readonly picture: Scalars["String"];
  readonly gender?: Maybe<Scalars["String"]>;
  readonly locale?: Maybe<Scalars["String"]>;
  readonly identities?: Maybe<ReadonlyArray<Identity>>;
  readonly isSocial: Scalars["Boolean"];
  readonly nativeLanguage: Language;
  readonly languages: ReadonlyArray<Language>;
  readonly ownedDecks: ReadonlyArray<Deck>;
  readonly subscribedDecks: ReadonlyArray<Deck>;
  readonly reviewQueue: ReadonlyArray<Review>;
  readonly reviewsCount: Scalars["Int"];
  readonly nextReview?: Maybe<Review>;
  readonly lessonQueue: ReadonlyArray<Review>;
  readonly lessonsCount: Scalars["Int"];
  readonly totalRating: Scalars["Int"];
  readonly totalSubscribers: Scalars["Int"];
  readonly badges: ReadonlyArray<Maybe<Scalars["String"]>>;
  readonly introStep?: Maybe<Scalars["Int"]>;
  readonly feed?: Maybe<ReadonlyArray<Maybe<Post>>>;
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

export type UserFeedArgs = {
  filter?: Maybe<PostFilterInput>;
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

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

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

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: {};
  UserFilterInput: UserFilterInput;
  Int: Scalars["Int"];
  User: User;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Identity: Identity;
  Boolean: Scalars["Boolean"];
  Language: Language;
  Deck: Deck;
  CardFilterInput: CardFilterInput;
  SortDirection: SortDirection;
  CardSortingOptions: CardSortingOptions;
  Card: Card;
  SubscriberFilterInput: SubscriberFilterInput;
  ReviewFilterInput: ReviewFilterInput;
  Date: Scalars["Date"];
  ReviewSortOptions: ReviewSortOptions;
  Review: Review;
  ReviewFields: ReviewFields;
  PostFilterInput: PostFilterInput;
  PostType: PostType;
  PostSortOption: PostSortOption;
  Post: Post;
  DeckFilterInput: DeckFilterInput;
  DeckSortBy: DeckSortBy;
  Mutation: {};
  AuthResult: AuthResult;
  UserInput: UserInput;
  CardInput: CardInput;
  PostInput: PostInput;
  DeckInput: DeckInput;
  JSON: Scalars["JSON"];
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveResolver<
  Result,
  Parent,
  ContextType = AppContext,
  Args = {
    discriminatorField?: Maybe<Maybe<Scalars["String"]>>;
    additionalFields?: Maybe<Maybe<Array<Maybe<AdditionalEntityFields>>>>;
  }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveResolver<
  Result,
  Parent,
  ContextType = AppContext,
  Args = {
    discriminatorField?: Maybe<Scalars["String"]>;
    additionalFields?: Maybe<Maybe<Array<Maybe<AdditionalEntityFields>>>>;
  }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveResolver<
  Result,
  Parent,
  ContextType = AppContext,
  Args = {
    embedded?: Maybe<Maybe<Scalars["Boolean"]>>;
    additionalFields?: Maybe<Maybe<Array<Maybe<AdditionalEntityFields>>>>;
  }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveResolver<
  Result,
  Parent,
  ContextType = AppContext,
  Args = { overrideType?: Maybe<Maybe<Scalars["String"]>> }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveResolver<
  Result,
  Parent,
  ContextType = AppContext,
  Args = {}
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveResolver<
  Result,
  Parent,
  ContextType = AppContext,
  Args = { overrideType?: Maybe<Maybe<Scalars["String"]>> }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveResolver<
  Result,
  Parent,
  ContextType = AppContext,
  Args = {}
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveResolver<
  Result,
  Parent,
  ContextType = AppContext,
  Args = { path?: Maybe<Scalars["String"]> }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthResultResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["AuthResult"]
> = {
  accessToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  idToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tokenType?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  expiresIn?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
};

export type CardResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["Card"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  translation?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  meaning?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  pronunciation?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  audioUrl?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  deck?: Resolver<Maybe<ResolversTypes["Deck"]>, ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type DeckResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["Deck"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  language?: Resolver<ResolversTypes["Language"], ParentType, ContextType>;
  nativeLanguage?: Resolver<
    ResolversTypes["Language"],
    ParentType,
    ContextType
  >;
  cards?: Resolver<
    ReadonlyArray<ResolversTypes["Card"]>,
    ParentType,
    ContextType,
    DeckCardsArgs
  >;
  cardCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  subscribers?: Resolver<
    ReadonlyArray<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    DeckSubscribersArgs
  >;
  subscriberCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  isLikedBy?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    DeckIsLikedByArgs
  >;
  tags?: Resolver<
    ReadonlyArray<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
};

export type IdentityResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["Identity"]
> = {
  userId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  provider?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  connection?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isSocial?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
};

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["JSON"], any> {
  name: "JSON";
}

export type LanguageResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["Language"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  nativeName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  languageCode?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  hasConverter?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  requiresIME?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  hasPronunciation?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
};

export type MutationResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["Mutation"]
> = {
  authenticate?: Resolver<
    Maybe<ResolversTypes["AuthResult"]>,
    ParentType,
    ContextType,
    MutationAuthenticateArgs
  >;
  logout?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  editUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    MutationEditUserArgs
  >;
  deleteUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    MutationDeleteUserArgs
  >;
  changeFollowingStatus?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    MutationChangeFollowingStatusArgs
  >;
  addLanguageToUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    MutationAddLanguageToUserArgs
  >;
  removeLanguageFromUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    MutationRemoveLanguageFromUserArgs
  >;
  createCard?: Resolver<
    Maybe<ResolversTypes["Deck"]>,
    ParentType,
    ContextType,
    MutationCreateCardArgs
  >;
  editCard?: Resolver<
    Maybe<ResolversTypes["Card"]>,
    ParentType,
    ContextType,
    MutationEditCardArgs
  >;
  deleteCards?: Resolver<
    Maybe<ResolversTypes["Deck"]>,
    ParentType,
    ContextType,
    MutationDeleteCardsArgs
  >;
  submitReview?: Resolver<
    Maybe<ResolversTypes["Review"]>,
    ParentType,
    ContextType,
    MutationSubmitReviewArgs
  >;
  createPost?: Resolver<
    Maybe<ReadonlyArray<Maybe<ResolversTypes["Post"]>>>,
    ParentType,
    ContextType,
    MutationCreatePostArgs
  >;
  editPost?: Resolver<
    Maybe<ResolversTypes["Post"]>,
    ParentType,
    ContextType,
    MutationEditPostArgs
  >;
  deletePost?: Resolver<
    Maybe<ReadonlyArray<Maybe<ResolversTypes["Post"]>>>,
    ParentType,
    ContextType,
    MutationDeletePostArgs
  >;
  addDeck?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    MutationAddDeckArgs
  >;
  updateDeck?: Resolver<
    Maybe<ResolversTypes["Deck"]>,
    ParentType,
    ContextType,
    MutationUpdateDeckArgs
  >;
  deleteDeck?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    MutationDeleteDeckArgs
  >;
  changeSubscriptionStatus?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    MutationChangeSubscriptionStatusArgs
  >;
  changeLikeStatus?: Resolver<
    Maybe<ResolversTypes["Deck"]>,
    ParentType,
    ContextType,
    MutationChangeLikeStatusArgs
  >;
  addTagToDeck?: Resolver<
    Maybe<ResolversTypes["Deck"]>,
    ParentType,
    ContextType,
    MutationAddTagToDeckArgs
  >;
  removeTagFromDeck?: Resolver<
    Maybe<ResolversTypes["Deck"]>,
    ParentType,
    ContextType,
    MutationRemoveTagFromDeckArgs
  >;
};

export type PostResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["Post"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  type?: Resolver<ResolversTypes["PostType"], ParentType, ContextType>;
  by?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  originalPost?: Resolver<
    Maybe<ResolversTypes["Post"]>,
    ParentType,
    ContextType
  >;
};

export type QueryResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["Query"]
> = {
  users?: Resolver<
    Maybe<ReadonlyArray<Maybe<ResolversTypes["User"]>>>,
    ParentType,
    ContextType,
    QueryUsersArgs
  >;
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    QueryUserArgs
  >;
  languages?: Resolver<
    Maybe<ReadonlyArray<Maybe<ResolversTypes["Language"]>>>,
    ParentType,
    ContextType
  >;
  language?: Resolver<
    Maybe<ResolversTypes["Language"]>,
    ParentType,
    ContextType,
    QueryLanguageArgs
  >;
  decks?: Resolver<
    Maybe<ReadonlyArray<Maybe<ResolversTypes["Deck"]>>>,
    ParentType,
    ContextType,
    QueryDecksArgs
  >;
  deck?: Resolver<
    Maybe<ResolversTypes["Deck"]>,
    ParentType,
    ContextType,
    QueryDeckArgs
  >;
  tags?: Resolver<
    ReadonlyArray<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    QueryTagsArgs
  >;
  review?: Resolver<
    Maybe<ResolversTypes["Review"]>,
    ParentType,
    ContextType,
    QueryReviewArgs
  >;
};

export type ReviewResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["Review"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  nextReviewAt?: Resolver<
    Maybe<ResolversTypes["Date"]>,
    ParentType,
    ContextType
  >;
  box?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  card?: Resolver<ResolversTypes["Card"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  reviewedFields?: Resolver<
    Maybe<ReadonlyArray<Maybe<ResolversTypes["ReviewFields"]>>>,
    ParentType,
    ContextType
  >;
  correct?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  picture?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  locale?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  identities?: Resolver<
    Maybe<ReadonlyArray<ResolversTypes["Identity"]>>,
    ParentType,
    ContextType
  >;
  isSocial?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  nativeLanguage?: Resolver<
    ResolversTypes["Language"],
    ParentType,
    ContextType
  >;
  languages?: Resolver<
    ReadonlyArray<ResolversTypes["Language"]>,
    ParentType,
    ContextType
  >;
  ownedDecks?: Resolver<
    ReadonlyArray<ResolversTypes["Deck"]>,
    ParentType,
    ContextType
  >;
  subscribedDecks?: Resolver<
    ReadonlyArray<ResolversTypes["Deck"]>,
    ParentType,
    ContextType
  >;
  reviewQueue?: Resolver<
    ReadonlyArray<ResolversTypes["Review"]>,
    ParentType,
    ContextType,
    UserReviewQueueArgs
  >;
  reviewsCount?: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    UserReviewsCountArgs
  >;
  nextReview?: Resolver<
    Maybe<ResolversTypes["Review"]>,
    ParentType,
    ContextType
  >;
  lessonQueue?: Resolver<
    ReadonlyArray<ResolversTypes["Review"]>,
    ParentType,
    ContextType,
    UserLessonQueueArgs
  >;
  lessonsCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalRating?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalSubscribers?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  badges?: Resolver<
    ReadonlyArray<Maybe<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  introStep?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  feed?: Resolver<
    Maybe<ReadonlyArray<Maybe<ResolversTypes["Post"]>>>,
    ParentType,
    ContextType,
    UserFeedArgs
  >;
};

export type Resolvers<ContextType = AppContext> = {
  AuthResult?: AuthResultResolvers<ContextType>;
  Card?: CardResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Deck?: DeckResolvers<ContextType>;
  Identity?: IdentityResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Language?: LanguageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = AppContext> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = AppContext> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = AppContext> = DirectiveResolvers<
  ContextType
>;
import { ObjectID } from "mongodb";
