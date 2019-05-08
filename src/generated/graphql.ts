export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  /** Custom scalar representing a Slate rich text AST */
  RichTextAST: any;
  /** Represents a date in time */
  Date: any;
  /** Raw JSON value */
  Json: any;
  /** The `Long` scalar type represents non-fractional signed whole numeric values.
   * Long can represent values between -(2^63) and 2^63 - 1.
   */
  Long: any;
  /** Custom scalar representing the hex color code value */
  HEX: any;
  /** Custom scalar representing the hue part of a rgba value. Value ranges from 0 - 255 */
  RGBAHue: any;
  /** Custom scalar representing the transparency part of a rgba value. Value ranges from 0 - 1 */
  RGBATransparency: any;
};

export type AdditionalEntityFields = {
  readonly path?: Maybe<Scalars["String"]>;
  readonly type?: Maybe<Scalars["String"]>;
};

export type AggregateAsset = {
  readonly count: Scalars["Int"];
};

export type AggregateLocation = {
  readonly count: Scalars["Int"];
};

export type AggregatePage = {
  readonly count: Scalars["Int"];
};

export type Asset = Node & {
  readonly status: Status;
  readonly updatedAt: Scalars["DateTime"];
  readonly createdAt: Scalars["DateTime"];
  readonly id: Scalars["ID"];
  readonly handle: Scalars["String"];
  readonly fileName: Scalars["String"];
  readonly height?: Maybe<Scalars["Float"]>;
  readonly width?: Maybe<Scalars["Float"]>;
  readonly size?: Maybe<Scalars["Float"]>;
  readonly mimeType?: Maybe<Scalars["String"]>;
  readonly mainImagePage?: Maybe<ReadonlyArray<Page>>;
  /** Get the url for the asset with provided transformations applied. */
  readonly url: Scalars["String"];
};

export type AssetMainImagePageArgs = {
  where?: Maybe<PageWhereInput>;
  orderBy?: Maybe<PageOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type AssetUrlArgs = {
  transformation?: Maybe<AssetTransformationInput>;
};

/** A connection to a list of items. */
export type AssetConnection = {
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** A list of edges. */
  readonly edges: ReadonlyArray<Maybe<AssetEdge>>;
  readonly aggregate: AggregateAsset;
};

export type AssetCreateInput = {
  readonly status?: Maybe<Status>;
  readonly handle: Scalars["String"];
  readonly fileName: Scalars["String"];
  readonly height?: Maybe<Scalars["Float"]>;
  readonly width?: Maybe<Scalars["Float"]>;
  readonly size?: Maybe<Scalars["Float"]>;
  readonly mimeType?: Maybe<Scalars["String"]>;
  readonly mainImagePage?: Maybe<PageCreateManyWithoutMainImageInput>;
};

export type AssetCreateOneWithoutMainImagePageInput = {
  readonly create?: Maybe<AssetCreateWithoutMainImagePageInput>;
  readonly connect?: Maybe<AssetWhereUniqueInput>;
};

export type AssetCreateWithoutMainImagePageInput = {
  readonly status?: Maybe<Status>;
  readonly handle: Scalars["String"];
  readonly fileName: Scalars["String"];
  readonly height?: Maybe<Scalars["Float"]>;
  readonly width?: Maybe<Scalars["Float"]>;
  readonly size?: Maybe<Scalars["Float"]>;
  readonly mimeType?: Maybe<Scalars["String"]>;
};

/** An edge in a connection. */
export type AssetEdge = {
  /** The item at the end of the edge. */
  readonly node: Asset;
  /** A cursor for use in pagination. */
  readonly cursor: Scalars["String"];
};

export type AssetOrderByInput =
  | "status_ASC"
  | "status_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "id_ASC"
  | "id_DESC"
  | "handle_ASC"
  | "handle_DESC"
  | "fileName_ASC"
  | "fileName_DESC"
  | "height_ASC"
  | "height_DESC"
  | "width_ASC"
  | "width_DESC"
  | "size_ASC"
  | "size_DESC"
  | "mimeType_ASC"
  | "mimeType_DESC";

export type AssetPreviousValues = {
  readonly status: Status;
  readonly updatedAt: Scalars["DateTime"];
  readonly createdAt: Scalars["DateTime"];
  readonly id: Scalars["ID"];
  readonly handle: Scalars["String"];
  readonly fileName: Scalars["String"];
  readonly height?: Maybe<Scalars["Float"]>;
  readonly width?: Maybe<Scalars["Float"]>;
  readonly size?: Maybe<Scalars["Float"]>;
  readonly mimeType?: Maybe<Scalars["String"]>;
};

export type AssetSubscriptionPayload = {
  readonly mutation: MutationType;
  readonly node?: Maybe<Asset>;
  readonly updatedFields?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly previousValues?: Maybe<AssetPreviousValues>;
};

export type AssetSubscriptionWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<AssetSubscriptionWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<AssetSubscriptionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<AssetSubscriptionWhereInput>>;
  /** The subscription event gets dispatched when it's listed in mutation_in */
  readonly mutation_in?: Maybe<ReadonlyArray<MutationType>>;
  /** The subscription event gets only dispatched when one of the updated fields names is included in this list */
  readonly updatedFields_contains?: Maybe<Scalars["String"]>;
  /** The subscription event gets only dispatched when all of the field names included in this list have been updated */
  readonly updatedFields_contains_every?: Maybe<
    ReadonlyArray<Scalars["String"]>
  >;
  /** The subscription event gets only dispatched when some of the field names included in this list have been updated */
  readonly updatedFields_contains_some?: Maybe<
    ReadonlyArray<Scalars["String"]>
  >;
  readonly node?: Maybe<AssetWhereInput>;
};

/** Transformations for Assets */
export type AssetTransformationInput = {
  readonly image?: Maybe<ImageTransformationInput>;
  readonly document?: Maybe<DocumentTransformationInput>;
  /** Pass `true` if you want to validate the passed transformation parameters */
  readonly validateOptions?: Maybe<Scalars["Boolean"]>;
};

export type AssetUpdateInput = {
  readonly status?: Maybe<Status>;
  readonly handle?: Maybe<Scalars["String"]>;
  readonly fileName?: Maybe<Scalars["String"]>;
  readonly height?: Maybe<Scalars["Float"]>;
  readonly width?: Maybe<Scalars["Float"]>;
  readonly size?: Maybe<Scalars["Float"]>;
  readonly mimeType?: Maybe<Scalars["String"]>;
  readonly mainImagePage?: Maybe<PageUpdateManyWithoutMainImageInput>;
};

export type AssetUpdateManyMutationInput = {
  readonly status?: Maybe<Status>;
  readonly handle?: Maybe<Scalars["String"]>;
  readonly fileName?: Maybe<Scalars["String"]>;
  readonly height?: Maybe<Scalars["Float"]>;
  readonly width?: Maybe<Scalars["Float"]>;
  readonly size?: Maybe<Scalars["Float"]>;
  readonly mimeType?: Maybe<Scalars["String"]>;
};

export type AssetUpdateOneWithoutMainImagePageInput = {
  readonly create?: Maybe<AssetCreateWithoutMainImagePageInput>;
  readonly connect?: Maybe<AssetWhereUniqueInput>;
  readonly disconnect?: Maybe<Scalars["Boolean"]>;
  readonly delete?: Maybe<Scalars["Boolean"]>;
  readonly update?: Maybe<AssetUpdateWithoutMainImagePageDataInput>;
  readonly upsert?: Maybe<AssetUpsertWithoutMainImagePageInput>;
};

export type AssetUpdateWithoutMainImagePageDataInput = {
  readonly status?: Maybe<Status>;
  readonly handle?: Maybe<Scalars["String"]>;
  readonly fileName?: Maybe<Scalars["String"]>;
  readonly height?: Maybe<Scalars["Float"]>;
  readonly width?: Maybe<Scalars["Float"]>;
  readonly size?: Maybe<Scalars["Float"]>;
  readonly mimeType?: Maybe<Scalars["String"]>;
};

export type AssetUpsertWithoutMainImagePageInput = {
  readonly update: AssetUpdateWithoutMainImagePageDataInput;
  readonly create: AssetCreateWithoutMainImagePageInput;
};

export type AssetWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<AssetWhereInput>>;
  readonly status?: Maybe<Status>;
  /** All values that are not equal to given value. */
  readonly status_not?: Maybe<Status>;
  /** All values that are contained in given list. */
  readonly status_in?: Maybe<ReadonlyArray<Status>>;
  /** All values that are not contained in given list. */
  readonly status_not_in?: Maybe<ReadonlyArray<Status>>;
  readonly updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars["DateTime"]>;
  readonly createdAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars["DateTime"]>;
  readonly id?: Maybe<Scalars["ID"]>;
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars["ID"]>;
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  /** All values less than the given value. */
  readonly id_lt?: Maybe<Scalars["ID"]>;
  /** All values less than or equal the given value. */
  readonly id_lte?: Maybe<Scalars["ID"]>;
  /** All values greater than the given value. */
  readonly id_gt?: Maybe<Scalars["ID"]>;
  /** All values greater than or equal the given value. */
  readonly id_gte?: Maybe<Scalars["ID"]>;
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars["ID"]>;
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars["ID"]>;
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars["ID"]>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars["ID"]>;
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars["ID"]>;
  /** All values not ending with the given string. */
  readonly id_not_ends_with?: Maybe<Scalars["ID"]>;
  readonly handle?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  readonly handle_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  readonly handle_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  readonly handle_not_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values less than the given value. */
  readonly handle_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  readonly handle_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  readonly handle_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  readonly handle_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  readonly handle_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  readonly handle_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  readonly handle_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  readonly handle_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  readonly handle_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  readonly handle_not_ends_with?: Maybe<Scalars["String"]>;
  readonly fileName?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  readonly fileName_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  readonly fileName_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  readonly fileName_not_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values less than the given value. */
  readonly fileName_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  readonly fileName_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  readonly fileName_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  readonly fileName_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  readonly fileName_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  readonly fileName_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  readonly fileName_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  readonly fileName_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  readonly fileName_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  readonly fileName_not_ends_with?: Maybe<Scalars["String"]>;
  readonly height?: Maybe<Scalars["Float"]>;
  /** All values that are not equal to given value. */
  readonly height_not?: Maybe<Scalars["Float"]>;
  /** All values that are contained in given list. */
  readonly height_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  /** All values that are not contained in given list. */
  readonly height_not_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  /** All values less than the given value. */
  readonly height_lt?: Maybe<Scalars["Float"]>;
  /** All values less than or equal the given value. */
  readonly height_lte?: Maybe<Scalars["Float"]>;
  /** All values greater than the given value. */
  readonly height_gt?: Maybe<Scalars["Float"]>;
  /** All values greater than or equal the given value. */
  readonly height_gte?: Maybe<Scalars["Float"]>;
  readonly width?: Maybe<Scalars["Float"]>;
  /** All values that are not equal to given value. */
  readonly width_not?: Maybe<Scalars["Float"]>;
  /** All values that are contained in given list. */
  readonly width_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  /** All values that are not contained in given list. */
  readonly width_not_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  /** All values less than the given value. */
  readonly width_lt?: Maybe<Scalars["Float"]>;
  /** All values less than or equal the given value. */
  readonly width_lte?: Maybe<Scalars["Float"]>;
  /** All values greater than the given value. */
  readonly width_gt?: Maybe<Scalars["Float"]>;
  /** All values greater than or equal the given value. */
  readonly width_gte?: Maybe<Scalars["Float"]>;
  readonly size?: Maybe<Scalars["Float"]>;
  /** All values that are not equal to given value. */
  readonly size_not?: Maybe<Scalars["Float"]>;
  /** All values that are contained in given list. */
  readonly size_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  /** All values that are not contained in given list. */
  readonly size_not_in?: Maybe<ReadonlyArray<Scalars["Float"]>>;
  /** All values less than the given value. */
  readonly size_lt?: Maybe<Scalars["Float"]>;
  /** All values less than or equal the given value. */
  readonly size_lte?: Maybe<Scalars["Float"]>;
  /** All values greater than the given value. */
  readonly size_gt?: Maybe<Scalars["Float"]>;
  /** All values greater than or equal the given value. */
  readonly size_gte?: Maybe<Scalars["Float"]>;
  readonly mimeType?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  readonly mimeType_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  readonly mimeType_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  readonly mimeType_not_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values less than the given value. */
  readonly mimeType_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  readonly mimeType_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  readonly mimeType_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  readonly mimeType_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  readonly mimeType_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  readonly mimeType_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  readonly mimeType_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  readonly mimeType_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  readonly mimeType_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  readonly mimeType_not_ends_with?: Maybe<Scalars["String"]>;
  readonly mainImagePage_every?: Maybe<PageWhereInput>;
  readonly mainImagePage_some?: Maybe<PageWhereInput>;
  readonly mainImagePage_none?: Maybe<PageWhereInput>;
};

export type AssetWhereUniqueInput = {
  readonly id?: Maybe<Scalars["ID"]>;
  readonly handle?: Maybe<Scalars["String"]>;
};

export type AuthResult = {
  readonly accessToken: Scalars["String"];
  readonly idToken: Scalars["String"];
  readonly tokenType: Scalars["String"];
  readonly expiresIn: Scalars["Int"];
};

export type BatchPayload = {
  /** The number of nodes that have been affected by the Batch operation. */
  readonly count: Scalars["Long"];
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

/** Representing a color value comprising of HEX, RGBA and css color values */
export type Color = {
  readonly hex: Scalars["HEX"];
  readonly rgba: Rgba;
  readonly css: Scalars["String"];
};

/** Accepts either HEX or RGBA color value. At least one of hex or rgba value should be passed. If both are passed RGBA is used. */
export type ColorInput = {
  readonly hex?: Maybe<Scalars["HEX"]>;
  readonly rgba?: Maybe<RgbaInput>;
};

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
  readonly excludeOwnedBy?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  readonly excludeSubscribedBy?: Maybe<ReadonlyArray<Scalars["ID"]>>;
};

export type DeckInput = {
  readonly name?: Maybe<Scalars["String"]>;
  readonly owner?: Maybe<Scalars["String"]>;
  readonly language?: Maybe<Scalars["ID"]>;
  readonly nativeLanguage?: Maybe<Scalars["ID"]>;
  readonly cards?: Maybe<ReadonlyArray<Maybe<CardInput>>>;
};

export type DeckSortBy = "name" | "cardCount" | "rating" | "subscriberCount";

export type DocumentFileTypes =
  | "jpg"
  | "odp"
  | "ods"
  | "odt"
  | "png"
  | "svg"
  | "txt"
  | "webp"
  | "docx"
  | "html"
  | "pdf"
  | "doc"
  | "xlsx"
  | "xls"
  | "pptx"
  | "ppt";

export type DocumentOutputInput = {
  /** Transforms a document into a desired file type.
   * See this matrix for format support:
   *
   * PDF:	jpg, odp, ods, odt, png, svg, txt, and webp
   * DOC:	docx, html, jpg, odt, pdf, png, svg, txt, and webp
   * DOCX:	doc, html, jpg, odt, pdf, png, svg, txt, and webp
   * ODT:	doc, docx, html, jpg, pdf, png, svg, txt, and webp
   * XLS:	jpg, pdf, ods, png, svg, xlsx, and webp
   * XLSX:	jpg, pdf, ods, png, svg, xls, and webp
   * ODS:	jpg, pdf, png, xls, svg, xlsx, and webp
   * PPT:	jpg, odp, pdf, png, svg, pptx, and webp
   * PPTX:	jpg, odp, pdf, png, svg, ppt, and webp
   * ODP:	jpg, pdf, png, ppt, svg, pptx, and webp
   * BMP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * GIF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * JPG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * PNG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * WEBP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * TIFF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * AI:	    jpg, odp, ods, odt, pdf, png, svg, and webp
   * PSD:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * SVG:	jpg, odp, ods, odt, pdf, png, and webp
   * HTML:	jpg, odt, pdf, svg, txt, and webp
   * TXT:	jpg, html, odt, pdf, svg, and webp
   */
  readonly format?: Maybe<DocumentFileTypes>;
};

/** Transformations for Documents */
export type DocumentTransformationInput = {
  /** Changes the output for the file. */
  readonly output?: Maybe<DocumentOutputInput>;
};

export type Identity = {
  readonly userId: Scalars["ID"];
  readonly provider: Scalars["String"];
  readonly connection: Scalars["String"];
  readonly isSocial: Scalars["Boolean"];
};

export type ImageFit =
  /** Resizes the image to fit within the specified parameters without distorting, cropping, or changing the aspect ratio. */
  | "clip"
  /** Resizes the image to fit the specified parameters exactly by removing any
   * parts of the image that don't fit within the boundaries.
   */
  | "crop"
  /** Resizes the image to fit the specified parameters exactly by scaling the image
   * to the desired size. The aspect ratio of the image is not respected and the
   * image can be distorted using this method.
   */
  | "scale"
  /** Resizes the image to fit within the parameters, but as opposed to 'fit:clip'
   * will not scale the image if the image is smaller than the output size.
   */
  | "max";

export type ImageResizeInput = {
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  readonly width?: Maybe<Scalars["Int"]>;
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  readonly height?: Maybe<Scalars["Int"]>;
  /** The default value for the fit parameter is fit:clip. */
  readonly fit?: Maybe<ImageFit>;
};

/** Transformations for Images */
export type ImageTransformationInput = {
  /** Resizes the image */
  readonly resize?: Maybe<ImageResizeInput>;
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

export type Locale = "EN";

export type Location = Node & {
  readonly updatedAt: Scalars["DateTime"];
  readonly createdAt: Scalars["DateTime"];
  readonly id: Scalars["ID"];
};

/** A connection to a list of items. */
export type LocationConnection = {
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** A list of edges. */
  readonly edges: ReadonlyArray<Maybe<LocationEdge>>;
  readonly aggregate: AggregateLocation;
};

/** An edge in a connection. */
export type LocationEdge = {
  /** The item at the end of the edge. */
  readonly node: Location;
  /** A cursor for use in pagination. */
  readonly cursor: Scalars["String"];
};

export type LocationOrderByInput =
  | "updatedAt_ASC"
  | "updatedAt_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "id_ASC"
  | "id_DESC";

export type LocationPreviousValues = {
  readonly updatedAt: Scalars["DateTime"];
  readonly createdAt: Scalars["DateTime"];
  readonly id: Scalars["ID"];
};

export type LocationSubscriptionPayload = {
  readonly mutation: MutationType;
  readonly node?: Maybe<Location>;
  readonly updatedFields?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly previousValues?: Maybe<LocationPreviousValues>;
};

export type LocationSubscriptionWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<LocationSubscriptionWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<LocationSubscriptionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<LocationSubscriptionWhereInput>>;
  /** The subscription event gets dispatched when it's listed in mutation_in */
  readonly mutation_in?: Maybe<ReadonlyArray<MutationType>>;
  /** The subscription event gets only dispatched when one of the updated fields names is included in this list */
  readonly updatedFields_contains?: Maybe<Scalars["String"]>;
  /** The subscription event gets only dispatched when all of the field names included in this list have been updated */
  readonly updatedFields_contains_every?: Maybe<
    ReadonlyArray<Scalars["String"]>
  >;
  /** The subscription event gets only dispatched when some of the field names included in this list have been updated */
  readonly updatedFields_contains_some?: Maybe<
    ReadonlyArray<Scalars["String"]>
  >;
  readonly node?: Maybe<LocationWhereInput>;
};

export type LocationWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<LocationWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<LocationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<LocationWhereInput>>;
  readonly updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars["DateTime"]>;
  readonly createdAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars["DateTime"]>;
  readonly id?: Maybe<Scalars["ID"]>;
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars["ID"]>;
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  /** All values less than the given value. */
  readonly id_lt?: Maybe<Scalars["ID"]>;
  /** All values less than or equal the given value. */
  readonly id_lte?: Maybe<Scalars["ID"]>;
  /** All values greater than the given value. */
  readonly id_gt?: Maybe<Scalars["ID"]>;
  /** All values greater than or equal the given value. */
  readonly id_gte?: Maybe<Scalars["ID"]>;
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars["ID"]>;
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars["ID"]>;
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars["ID"]>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars["ID"]>;
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars["ID"]>;
  /** All values not ending with the given string. */
  readonly id_not_ends_with?: Maybe<Scalars["ID"]>;
};

export type LocationWhereUniqueInput = {
  readonly id?: Maybe<Scalars["ID"]>;
};

export type Mutation = {
  readonly createAsset: Asset;
  readonly createLocation: Location;
  readonly createPage: Page;
  readonly updateAsset?: Maybe<Asset>;
  readonly updatePage?: Maybe<Page>;
  readonly deleteAsset?: Maybe<Asset>;
  readonly deleteLocation?: Maybe<Location>;
  readonly deletePage?: Maybe<Page>;
  readonly upsertAsset: Asset;
  readonly upsertPage: Page;
  readonly updateManyAssets: BatchPayload;
  readonly updateManyPages: BatchPayload;
  readonly deleteManyAssets: BatchPayload;
  readonly deleteManyLocations: BatchPayload;
  readonly deleteManyPages: BatchPayload;
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

export type MutationCreateAssetArgs = {
  data: AssetCreateInput;
};

export type MutationCreatePageArgs = {
  data: PageCreateInput;
};

export type MutationUpdateAssetArgs = {
  data: AssetUpdateInput;
  where: AssetWhereUniqueInput;
};

export type MutationUpdatePageArgs = {
  data: PageUpdateInput;
  where: PageWhereUniqueInput;
};

export type MutationDeleteAssetArgs = {
  where: AssetWhereUniqueInput;
};

export type MutationDeleteLocationArgs = {
  where: LocationWhereUniqueInput;
};

export type MutationDeletePageArgs = {
  where: PageWhereUniqueInput;
};

export type MutationUpsertAssetArgs = {
  where: AssetWhereUniqueInput;
  create: AssetCreateInput;
  update: AssetUpdateInput;
};

export type MutationUpsertPageArgs = {
  where: PageWhereUniqueInput;
  create: PageCreateInput;
  update: PageUpdateInput;
};

export type MutationUpdateManyAssetsArgs = {
  data: AssetUpdateManyMutationInput;
  where?: Maybe<AssetWhereInput>;
};

export type MutationUpdateManyPagesArgs = {
  data: PageUpdateManyMutationInput;
  where?: Maybe<PageWhereInput>;
};

export type MutationDeleteManyAssetsArgs = {
  where?: Maybe<AssetWhereInput>;
};

export type MutationDeleteManyLocationsArgs = {
  where?: Maybe<LocationWhereInput>;
};

export type MutationDeleteManyPagesArgs = {
  where?: Maybe<PageWhereInput>;
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

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  readonly id: Scalars["ID"];
};

export type Page = Node & {
  readonly status: Status;
  readonly updatedAt: Scalars["DateTime"];
  readonly createdAt: Scalars["DateTime"];
  readonly id: Scalars["ID"];
  readonly header?: Maybe<Scalars["String"]>;
  readonly mainImage?: Maybe<Asset>;
  readonly imageHeader?: Maybe<Scalars["String"]>;
  readonly imageSubheader?: Maybe<Scalars["String"]>;
  readonly slug: Scalars["String"];
  readonly intro?: Maybe<RichText>;
  readonly main?: Maybe<RichText>;
  readonly blurbs?: Maybe<RichText>;
  readonly outro?: Maybe<RichText>;
};

/** A connection to a list of items. */
export type PageConnection = {
  /** Information to aid in pagination. */
  readonly pageInfo: PageInfo;
  /** A list of edges. */
  readonly edges: ReadonlyArray<Maybe<PageEdge>>;
  readonly aggregate: AggregatePage;
};

export type PageCreateInput = {
  readonly status?: Maybe<Status>;
  readonly header?: Maybe<Scalars["String"]>;
  readonly imageHeader?: Maybe<Scalars["String"]>;
  readonly imageSubheader?: Maybe<Scalars["String"]>;
  readonly slug: Scalars["String"];
  readonly intro?: Maybe<Scalars["RichTextAST"]>;
  readonly main?: Maybe<Scalars["RichTextAST"]>;
  readonly blurbs?: Maybe<Scalars["RichTextAST"]>;
  readonly outro?: Maybe<Scalars["RichTextAST"]>;
  readonly mainImage?: Maybe<AssetCreateOneWithoutMainImagePageInput>;
};

export type PageCreateManyWithoutMainImageInput = {
  readonly create?: Maybe<ReadonlyArray<PageCreateWithoutMainImageInput>>;
  readonly connect?: Maybe<ReadonlyArray<PageWhereUniqueInput>>;
};

export type PageCreateWithoutMainImageInput = {
  readonly status?: Maybe<Status>;
  readonly header?: Maybe<Scalars["String"]>;
  readonly imageHeader?: Maybe<Scalars["String"]>;
  readonly imageSubheader?: Maybe<Scalars["String"]>;
  readonly slug: Scalars["String"];
  readonly intro?: Maybe<Scalars["Json"]>;
  readonly main?: Maybe<Scalars["Json"]>;
  readonly blurbs?: Maybe<Scalars["Json"]>;
  readonly outro?: Maybe<Scalars["Json"]>;
};

/** An edge in a connection. */
export type PageEdge = {
  /** The item at the end of the edge. */
  readonly node: Page;
  /** A cursor for use in pagination. */
  readonly cursor: Scalars["String"];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  /** When paginating forwards, are there more items? */
  readonly hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  readonly hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  readonly startCursor?: Maybe<Scalars["String"]>;
  /** When paginating forwards, the cursor to continue. */
  readonly endCursor?: Maybe<Scalars["String"]>;
};

export type PageOrderByInput =
  | "status_ASC"
  | "status_DESC"
  | "updatedAt_ASC"
  | "updatedAt_DESC"
  | "createdAt_ASC"
  | "createdAt_DESC"
  | "id_ASC"
  | "id_DESC"
  | "header_ASC"
  | "header_DESC"
  | "imageHeader_ASC"
  | "imageHeader_DESC"
  | "imageSubheader_ASC"
  | "imageSubheader_DESC"
  | "slug_ASC"
  | "slug_DESC"
  | "intro_ASC"
  | "intro_DESC"
  | "main_ASC"
  | "main_DESC"
  | "blurbs_ASC"
  | "blurbs_DESC"
  | "outro_ASC"
  | "outro_DESC";

export type PagePreviousValues = {
  readonly status: Status;
  readonly updatedAt: Scalars["DateTime"];
  readonly createdAt: Scalars["DateTime"];
  readonly id: Scalars["ID"];
  readonly header?: Maybe<Scalars["String"]>;
  readonly imageHeader?: Maybe<Scalars["String"]>;
  readonly imageSubheader?: Maybe<Scalars["String"]>;
  readonly slug: Scalars["String"];
  readonly intro?: Maybe<RichText>;
  readonly main?: Maybe<RichText>;
  readonly blurbs?: Maybe<RichText>;
  readonly outro?: Maybe<RichText>;
};

export type PageScalarWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<PageScalarWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<PageScalarWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<PageScalarWhereInput>>;
  readonly status?: Maybe<Status>;
  /** All values that are not equal to given value. */
  readonly status_not?: Maybe<Status>;
  /** All values that are contained in given list. */
  readonly status_in?: Maybe<ReadonlyArray<Status>>;
  /** All values that are not contained in given list. */
  readonly status_not_in?: Maybe<ReadonlyArray<Status>>;
  readonly updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars["DateTime"]>;
  readonly createdAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars["DateTime"]>;
  readonly id?: Maybe<Scalars["ID"]>;
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars["ID"]>;
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  /** All values less than the given value. */
  readonly id_lt?: Maybe<Scalars["ID"]>;
  /** All values less than or equal the given value. */
  readonly id_lte?: Maybe<Scalars["ID"]>;
  /** All values greater than the given value. */
  readonly id_gt?: Maybe<Scalars["ID"]>;
  /** All values greater than or equal the given value. */
  readonly id_gte?: Maybe<Scalars["ID"]>;
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars["ID"]>;
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars["ID"]>;
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars["ID"]>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars["ID"]>;
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars["ID"]>;
  /** All values not ending with the given string. */
  readonly id_not_ends_with?: Maybe<Scalars["ID"]>;
  readonly header?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  readonly header_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  readonly header_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  readonly header_not_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values less than the given value. */
  readonly header_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  readonly header_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  readonly header_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  readonly header_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  readonly header_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  readonly header_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  readonly header_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  readonly header_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  readonly header_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  readonly header_not_ends_with?: Maybe<Scalars["String"]>;
  readonly imageHeader?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  readonly imageHeader_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  readonly imageHeader_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  readonly imageHeader_not_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values less than the given value. */
  readonly imageHeader_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  readonly imageHeader_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  readonly imageHeader_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  readonly imageHeader_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  readonly imageHeader_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  readonly imageHeader_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  readonly imageHeader_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  readonly imageHeader_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  readonly imageHeader_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  readonly imageHeader_not_ends_with?: Maybe<Scalars["String"]>;
  readonly imageSubheader?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  readonly imageSubheader_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  readonly imageSubheader_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  readonly imageSubheader_not_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values less than the given value. */
  readonly imageSubheader_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  readonly imageSubheader_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  readonly imageSubheader_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  readonly imageSubheader_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  readonly imageSubheader_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  readonly imageSubheader_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  readonly imageSubheader_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  readonly imageSubheader_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  readonly imageSubheader_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  readonly imageSubheader_not_ends_with?: Maybe<Scalars["String"]>;
  readonly slug?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  readonly slug_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  readonly slug_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  readonly slug_not_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values less than the given value. */
  readonly slug_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  readonly slug_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  readonly slug_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  readonly slug_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  readonly slug_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  readonly slug_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  readonly slug_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  readonly slug_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  readonly slug_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  readonly slug_not_ends_with?: Maybe<Scalars["String"]>;
};

export type PageSubscriptionPayload = {
  readonly mutation: MutationType;
  readonly node?: Maybe<Page>;
  readonly updatedFields?: Maybe<ReadonlyArray<Scalars["String"]>>;
  readonly previousValues?: Maybe<PagePreviousValues>;
};

export type PageSubscriptionWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<PageSubscriptionWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<PageSubscriptionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<PageSubscriptionWhereInput>>;
  /** The subscription event gets dispatched when it's listed in mutation_in */
  readonly mutation_in?: Maybe<ReadonlyArray<MutationType>>;
  /** The subscription event gets only dispatched when one of the updated fields names is included in this list */
  readonly updatedFields_contains?: Maybe<Scalars["String"]>;
  /** The subscription event gets only dispatched when all of the field names included in this list have been updated */
  readonly updatedFields_contains_every?: Maybe<
    ReadonlyArray<Scalars["String"]>
  >;
  /** The subscription event gets only dispatched when some of the field names included in this list have been updated */
  readonly updatedFields_contains_some?: Maybe<
    ReadonlyArray<Scalars["String"]>
  >;
  readonly node?: Maybe<PageWhereInput>;
};

export type PageUpdateInput = {
  readonly status?: Maybe<Status>;
  readonly header?: Maybe<Scalars["String"]>;
  readonly imageHeader?: Maybe<Scalars["String"]>;
  readonly imageSubheader?: Maybe<Scalars["String"]>;
  readonly slug?: Maybe<Scalars["String"]>;
  readonly intro?: Maybe<Scalars["RichTextAST"]>;
  readonly main?: Maybe<Scalars["RichTextAST"]>;
  readonly blurbs?: Maybe<Scalars["RichTextAST"]>;
  readonly outro?: Maybe<Scalars["RichTextAST"]>;
  readonly mainImage?: Maybe<AssetUpdateOneWithoutMainImagePageInput>;
};

export type PageUpdateManyDataInput = {
  readonly status?: Maybe<Status>;
  readonly header?: Maybe<Scalars["String"]>;
  readonly imageHeader?: Maybe<Scalars["String"]>;
  readonly imageSubheader?: Maybe<Scalars["String"]>;
  readonly slug?: Maybe<Scalars["String"]>;
  readonly intro?: Maybe<Scalars["Json"]>;
  readonly main?: Maybe<Scalars["Json"]>;
  readonly blurbs?: Maybe<Scalars["Json"]>;
  readonly outro?: Maybe<Scalars["Json"]>;
};

export type PageUpdateManyMutationInput = {
  readonly status?: Maybe<Status>;
  readonly header?: Maybe<Scalars["String"]>;
  readonly imageHeader?: Maybe<Scalars["String"]>;
  readonly imageSubheader?: Maybe<Scalars["String"]>;
  readonly slug?: Maybe<Scalars["String"]>;
  readonly intro?: Maybe<Scalars["RichTextAST"]>;
  readonly main?: Maybe<Scalars["RichTextAST"]>;
  readonly blurbs?: Maybe<Scalars["RichTextAST"]>;
  readonly outro?: Maybe<Scalars["RichTextAST"]>;
};

export type PageUpdateManyWithoutMainImageInput = {
  readonly create?: Maybe<ReadonlyArray<PageCreateWithoutMainImageInput>>;
  readonly connect?: Maybe<ReadonlyArray<PageWhereUniqueInput>>;
  readonly set?: Maybe<ReadonlyArray<PageWhereUniqueInput>>;
  readonly disconnect?: Maybe<ReadonlyArray<PageWhereUniqueInput>>;
  readonly delete?: Maybe<ReadonlyArray<PageWhereUniqueInput>>;
  readonly update?: Maybe<
    ReadonlyArray<PageUpdateWithWhereUniqueWithoutMainImageInput>
  >;
  readonly updateMany?: Maybe<
    ReadonlyArray<PageUpdateManyWithWhereNestedInput>
  >;
  readonly deleteMany?: Maybe<ReadonlyArray<PageScalarWhereInput>>;
  readonly upsert?: Maybe<
    ReadonlyArray<PageUpsertWithWhereUniqueWithoutMainImageInput>
  >;
};

export type PageUpdateManyWithWhereNestedInput = {
  readonly where: PageScalarWhereInput;
  readonly data: PageUpdateManyDataInput;
};

export type PageUpdateWithoutMainImageDataInput = {
  readonly status?: Maybe<Status>;
  readonly header?: Maybe<Scalars["String"]>;
  readonly imageHeader?: Maybe<Scalars["String"]>;
  readonly imageSubheader?: Maybe<Scalars["String"]>;
  readonly slug?: Maybe<Scalars["String"]>;
  readonly intro?: Maybe<Scalars["Json"]>;
  readonly main?: Maybe<Scalars["Json"]>;
  readonly blurbs?: Maybe<Scalars["Json"]>;
  readonly outro?: Maybe<Scalars["Json"]>;
};

export type PageUpdateWithWhereUniqueWithoutMainImageInput = {
  readonly where: PageWhereUniqueInput;
  readonly data: PageUpdateWithoutMainImageDataInput;
};

export type PageUpsertWithWhereUniqueWithoutMainImageInput = {
  readonly where: PageWhereUniqueInput;
  readonly update: PageUpdateWithoutMainImageDataInput;
  readonly create: PageCreateWithoutMainImageInput;
};

export type PageWhereInput = {
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<PageWhereInput>>;
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<PageWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<PageWhereInput>>;
  readonly status?: Maybe<Status>;
  /** All values that are not equal to given value. */
  readonly status_not?: Maybe<Status>;
  /** All values that are contained in given list. */
  readonly status_in?: Maybe<ReadonlyArray<Status>>;
  /** All values that are not contained in given list. */
  readonly status_not_in?: Maybe<ReadonlyArray<Status>>;
  readonly updatedAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars["DateTime"]>;
  readonly createdAt?: Maybe<Scalars["DateTime"]>;
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars["DateTime"]>;
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars["DateTime"]>>;
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars["DateTime"]>;
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars["DateTime"]>;
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars["DateTime"]>;
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars["DateTime"]>;
  readonly id?: Maybe<Scalars["ID"]>;
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars["ID"]>;
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars["ID"]>>;
  /** All values less than the given value. */
  readonly id_lt?: Maybe<Scalars["ID"]>;
  /** All values less than or equal the given value. */
  readonly id_lte?: Maybe<Scalars["ID"]>;
  /** All values greater than the given value. */
  readonly id_gt?: Maybe<Scalars["ID"]>;
  /** All values greater than or equal the given value. */
  readonly id_gte?: Maybe<Scalars["ID"]>;
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars["ID"]>;
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars["ID"]>;
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars["ID"]>;
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars["ID"]>;
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars["ID"]>;
  /** All values not ending with the given string. */
  readonly id_not_ends_with?: Maybe<Scalars["ID"]>;
  readonly header?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  readonly header_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  readonly header_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  readonly header_not_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values less than the given value. */
  readonly header_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  readonly header_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  readonly header_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  readonly header_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  readonly header_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  readonly header_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  readonly header_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  readonly header_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  readonly header_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  readonly header_not_ends_with?: Maybe<Scalars["String"]>;
  readonly imageHeader?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  readonly imageHeader_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  readonly imageHeader_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  readonly imageHeader_not_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values less than the given value. */
  readonly imageHeader_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  readonly imageHeader_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  readonly imageHeader_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  readonly imageHeader_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  readonly imageHeader_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  readonly imageHeader_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  readonly imageHeader_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  readonly imageHeader_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  readonly imageHeader_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  readonly imageHeader_not_ends_with?: Maybe<Scalars["String"]>;
  readonly imageSubheader?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  readonly imageSubheader_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  readonly imageSubheader_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  readonly imageSubheader_not_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values less than the given value. */
  readonly imageSubheader_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  readonly imageSubheader_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  readonly imageSubheader_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  readonly imageSubheader_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  readonly imageSubheader_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  readonly imageSubheader_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  readonly imageSubheader_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  readonly imageSubheader_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  readonly imageSubheader_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  readonly imageSubheader_not_ends_with?: Maybe<Scalars["String"]>;
  readonly slug?: Maybe<Scalars["String"]>;
  /** All values that are not equal to given value. */
  readonly slug_not?: Maybe<Scalars["String"]>;
  /** All values that are contained in given list. */
  readonly slug_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values that are not contained in given list. */
  readonly slug_not_in?: Maybe<ReadonlyArray<Scalars["String"]>>;
  /** All values less than the given value. */
  readonly slug_lt?: Maybe<Scalars["String"]>;
  /** All values less than or equal the given value. */
  readonly slug_lte?: Maybe<Scalars["String"]>;
  /** All values greater than the given value. */
  readonly slug_gt?: Maybe<Scalars["String"]>;
  /** All values greater than or equal the given value. */
  readonly slug_gte?: Maybe<Scalars["String"]>;
  /** All values containing the given string. */
  readonly slug_contains?: Maybe<Scalars["String"]>;
  /** All values not containing the given string. */
  readonly slug_not_contains?: Maybe<Scalars["String"]>;
  /** All values starting with the given string. */
  readonly slug_starts_with?: Maybe<Scalars["String"]>;
  /** All values not starting with the given string. */
  readonly slug_not_starts_with?: Maybe<Scalars["String"]>;
  /** All values ending with the given string. */
  readonly slug_ends_with?: Maybe<Scalars["String"]>;
  /** All values not ending with the given string. */
  readonly slug_not_ends_with?: Maybe<Scalars["String"]>;
  readonly mainImage?: Maybe<AssetWhereInput>;
};

export type PageWhereUniqueInput = {
  readonly id?: Maybe<Scalars["ID"]>;
  readonly slug?: Maybe<Scalars["String"]>;
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
  readonly assets: ReadonlyArray<Maybe<Asset>>;
  readonly locations: ReadonlyArray<Maybe<Location>>;
  readonly pages: ReadonlyArray<Maybe<Page>>;
  readonly asset?: Maybe<Asset>;
  readonly location?: Maybe<Location>;
  readonly page?: Maybe<Page>;
  readonly assetsConnection: AssetConnection;
  readonly locationsConnection: LocationConnection;
  readonly pagesConnection: PageConnection;
  /** Fetches an object given its ID */
  readonly node?: Maybe<Node>;
  readonly users?: Maybe<ReadonlyArray<Maybe<User>>>;
  readonly user?: Maybe<User>;
  readonly languages?: Maybe<ReadonlyArray<Maybe<Language>>>;
  readonly language?: Maybe<Language>;
  readonly decks?: Maybe<ReadonlyArray<Maybe<Deck>>>;
  readonly deck?: Maybe<Deck>;
  readonly tags: ReadonlyArray<Scalars["String"]>;
  readonly review?: Maybe<Review>;
};

export type QueryAssetsArgs = {
  where?: Maybe<AssetWhereInput>;
  orderBy?: Maybe<AssetOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryLocationsArgs = {
  where?: Maybe<LocationWhereInput>;
  orderBy?: Maybe<LocationOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryPagesArgs = {
  where?: Maybe<PageWhereInput>;
  orderBy?: Maybe<PageOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryAssetArgs = {
  where: AssetWhereUniqueInput;
};

export type QueryLocationArgs = {
  where: LocationWhereUniqueInput;
};

export type QueryPageArgs = {
  where: PageWhereUniqueInput;
};

export type QueryAssetsConnectionArgs = {
  where?: Maybe<AssetWhereInput>;
  orderBy?: Maybe<AssetOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryLocationsConnectionArgs = {
  where?: Maybe<LocationWhereInput>;
  orderBy?: Maybe<LocationOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryPagesConnectionArgs = {
  where?: Maybe<PageWhereInput>;
  orderBy?: Maybe<PageOrderByInput>;
  skip?: Maybe<Scalars["Int"]>;
  after?: Maybe<Scalars["String"]>;
  before?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  last?: Maybe<Scalars["Int"]>;
};

export type QueryNodeArgs = {
  id: Scalars["ID"];
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

/** Representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type Rgba = {
  readonly r: Scalars["RGBAHue"];
  readonly g: Scalars["RGBAHue"];
  readonly b: Scalars["RGBAHue"];
  readonly a: Scalars["RGBATransparency"];
};

/** Input type representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type RgbaInput = {
  readonly r: Scalars["RGBAHue"];
  readonly g: Scalars["RGBAHue"];
  readonly b: Scalars["RGBAHue"];
  readonly a: Scalars["RGBATransparency"];
};

/** Custom type representing a rich text value comprising of raw rich text ast, html, markdown and text values */
export type RichText = {
  readonly raw?: Maybe<Scalars["RichTextAST"]>;
  readonly html?: Maybe<Scalars["String"]>;
  readonly markdown?: Maybe<Scalars["String"]>;
  readonly text?: Maybe<Scalars["String"]>;
};

export type SortDirection = "asc" | "desc";

export type Status = "DRAFT" | "PUBLISHED" | "ARCHIVED";

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
  readonly search?: Maybe<Scalars["String"]>;
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
  AssetWhereInput: AssetWhereInput;
  Status: Status;
  DateTime: Scalars["DateTime"];
  ID: Scalars["ID"];
  String: Scalars["String"];
  Float: Scalars["Float"];
  PageWhereInput: PageWhereInput;
  AssetOrderByInput: AssetOrderByInput;
  Int: Scalars["Int"];
  Asset: Asset;
  Node: Node;
  PageOrderByInput: PageOrderByInput;
  Page: Page;
  RichText: RichText;
  RichTextAST: Scalars["RichTextAST"];
  AssetTransformationInput: AssetTransformationInput;
  ImageTransformationInput: ImageTransformationInput;
  ImageResizeInput: ImageResizeInput;
  ImageFit: ImageFit;
  DocumentTransformationInput: DocumentTransformationInput;
  DocumentOutputInput: DocumentOutputInput;
  DocumentFileTypes: DocumentFileTypes;
  Boolean: Scalars["Boolean"];
  LocationWhereInput: LocationWhereInput;
  LocationOrderByInput: LocationOrderByInput;
  Location: Location;
  AssetWhereUniqueInput: AssetWhereUniqueInput;
  LocationWhereUniqueInput: LocationWhereUniqueInput;
  PageWhereUniqueInput: PageWhereUniqueInput;
  AssetConnection: AssetConnection;
  PageInfo: PageInfo;
  AssetEdge: AssetEdge;
  AggregateAsset: AggregateAsset;
  LocationConnection: LocationConnection;
  LocationEdge: LocationEdge;
  AggregateLocation: AggregateLocation;
  PageConnection: PageConnection;
  PageEdge: PageEdge;
  AggregatePage: AggregatePage;
  UserFilterInput: UserFilterInput;
  User: User;
  Identity: Identity;
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
  AssetCreateInput: AssetCreateInput;
  PageCreateManyWithoutMainImageInput: PageCreateManyWithoutMainImageInput;
  PageCreateWithoutMainImageInput: PageCreateWithoutMainImageInput;
  Json: Scalars["Json"];
  PageCreateInput: PageCreateInput;
  AssetCreateOneWithoutMainImagePageInput: AssetCreateOneWithoutMainImagePageInput;
  AssetCreateWithoutMainImagePageInput: AssetCreateWithoutMainImagePageInput;
  AssetUpdateInput: AssetUpdateInput;
  PageUpdateManyWithoutMainImageInput: PageUpdateManyWithoutMainImageInput;
  PageUpdateWithWhereUniqueWithoutMainImageInput: PageUpdateWithWhereUniqueWithoutMainImageInput;
  PageUpdateWithoutMainImageDataInput: PageUpdateWithoutMainImageDataInput;
  PageUpdateManyWithWhereNestedInput: PageUpdateManyWithWhereNestedInput;
  PageScalarWhereInput: PageScalarWhereInput;
  PageUpdateManyDataInput: PageUpdateManyDataInput;
  PageUpsertWithWhereUniqueWithoutMainImageInput: PageUpsertWithWhereUniqueWithoutMainImageInput;
  PageUpdateInput: PageUpdateInput;
  AssetUpdateOneWithoutMainImagePageInput: AssetUpdateOneWithoutMainImagePageInput;
  AssetUpdateWithoutMainImagePageDataInput: AssetUpdateWithoutMainImagePageDataInput;
  AssetUpsertWithoutMainImagePageInput: AssetUpsertWithoutMainImagePageInput;
  AssetUpdateManyMutationInput: AssetUpdateManyMutationInput;
  BatchPayload: BatchPayload;
  Long: Scalars["Long"];
  PageUpdateManyMutationInput: PageUpdateManyMutationInput;
  AuthResult: AuthResult;
  UserInput: UserInput;
  CardInput: CardInput;
  PostInput: PostInput;
  DeckInput: DeckInput;
  AssetPreviousValues: AssetPreviousValues;
  AssetSubscriptionPayload: AssetSubscriptionPayload;
  MutationType: MutationType;
  AssetSubscriptionWhereInput: AssetSubscriptionWhereInput;
  Color: Color;
  HEX: Scalars["HEX"];
  RGBA: Rgba;
  RGBAHue: Scalars["RGBAHue"];
  RGBATransparency: Scalars["RGBATransparency"];
  ColorInput: ColorInput;
  RGBAInput: RgbaInput;
  Locale: Locale;
  LocationPreviousValues: LocationPreviousValues;
  LocationSubscriptionPayload: LocationSubscriptionPayload;
  LocationSubscriptionWhereInput: LocationSubscriptionWhereInput;
  PagePreviousValues: PagePreviousValues;
  PageSubscriptionPayload: PageSubscriptionPayload;
  PageSubscriptionWhereInput: PageSubscriptionWhereInput;
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

export type AggregateAssetResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["AggregateAsset"]
> = {
  count?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
};

export type AggregateLocationResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["AggregateLocation"]
> = {
  count?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
};

export type AggregatePageResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["AggregatePage"]
> = {
  count?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
};

export type AssetResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["Asset"]
> = {
  status?: Resolver<ResolversTypes["Status"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  handle?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  fileName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  mimeType?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  mainImagePage?: Resolver<
    Maybe<ReadonlyArray<ResolversTypes["Page"]>>,
    ParentType,
    ContextType,
    AssetMainImagePageArgs
  >;
  url?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType,
    AssetUrlArgs
  >;
};

export type AssetConnectionResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["AssetConnection"]
> = {
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  edges?: Resolver<
    ReadonlyArray<Maybe<ResolversTypes["AssetEdge"]>>,
    ParentType,
    ContextType
  >;
  aggregate?: Resolver<
    ResolversTypes["AggregateAsset"],
    ParentType,
    ContextType
  >;
};

export type AssetEdgeResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["AssetEdge"]
> = {
  node?: Resolver<ResolversTypes["Asset"], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type AssetPreviousValuesResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["AssetPreviousValues"]
> = {
  status?: Resolver<ResolversTypes["Status"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  handle?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  fileName?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  mimeType?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
};

export type AssetSubscriptionPayloadResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["AssetSubscriptionPayload"]
> = {
  mutation?: Resolver<ResolversTypes["MutationType"], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes["Asset"]>, ParentType, ContextType>;
  updatedFields?: Resolver<
    Maybe<ReadonlyArray<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  previousValues?: Resolver<
    Maybe<ResolversTypes["AssetPreviousValues"]>,
    ParentType,
    ContextType
  >;
};

export type AuthResultResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["AuthResult"]
> = {
  accessToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  idToken?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tokenType?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  expiresIn?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
};

export type BatchPayloadResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["BatchPayload"]
> = {
  count?: Resolver<ResolversTypes["Long"], ParentType, ContextType>;
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

export type ColorResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["Color"]
> = {
  hex?: Resolver<ResolversTypes["HEX"], ParentType, ContextType>;
  rgba?: Resolver<ResolversTypes["RGBA"], ParentType, ContextType>;
  css?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime";
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

export interface HexScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["HEX"], any> {
  name: "HEX";
}

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
  extends GraphQLScalarTypeConfig<ResolversTypes["Json"], any> {
  name: "Json";
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

export type LocationResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["Location"]
> = {
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
};

export type LocationConnectionResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["LocationConnection"]
> = {
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  edges?: Resolver<
    ReadonlyArray<Maybe<ResolversTypes["LocationEdge"]>>,
    ParentType,
    ContextType
  >;
  aggregate?: Resolver<
    ResolversTypes["AggregateLocation"],
    ParentType,
    ContextType
  >;
};

export type LocationEdgeResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["LocationEdge"]
> = {
  node?: Resolver<ResolversTypes["Location"], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type LocationPreviousValuesResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["LocationPreviousValues"]
> = {
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
};

export type LocationSubscriptionPayloadResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["LocationSubscriptionPayload"]
> = {
  mutation?: Resolver<ResolversTypes["MutationType"], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes["Location"]>, ParentType, ContextType>;
  updatedFields?: Resolver<
    Maybe<ReadonlyArray<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  previousValues?: Resolver<
    Maybe<ResolversTypes["LocationPreviousValues"]>,
    ParentType,
    ContextType
  >;
};

export interface LongScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Long"], any> {
  name: "Long";
}

export type MutationResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["Mutation"]
> = {
  createAsset?: Resolver<
    ResolversTypes["Asset"],
    ParentType,
    ContextType,
    MutationCreateAssetArgs
  >;
  createLocation?: Resolver<
    ResolversTypes["Location"],
    ParentType,
    ContextType
  >;
  createPage?: Resolver<
    ResolversTypes["Page"],
    ParentType,
    ContextType,
    MutationCreatePageArgs
  >;
  updateAsset?: Resolver<
    Maybe<ResolversTypes["Asset"]>,
    ParentType,
    ContextType,
    MutationUpdateAssetArgs
  >;
  updatePage?: Resolver<
    Maybe<ResolversTypes["Page"]>,
    ParentType,
    ContextType,
    MutationUpdatePageArgs
  >;
  deleteAsset?: Resolver<
    Maybe<ResolversTypes["Asset"]>,
    ParentType,
    ContextType,
    MutationDeleteAssetArgs
  >;
  deleteLocation?: Resolver<
    Maybe<ResolversTypes["Location"]>,
    ParentType,
    ContextType,
    MutationDeleteLocationArgs
  >;
  deletePage?: Resolver<
    Maybe<ResolversTypes["Page"]>,
    ParentType,
    ContextType,
    MutationDeletePageArgs
  >;
  upsertAsset?: Resolver<
    ResolversTypes["Asset"],
    ParentType,
    ContextType,
    MutationUpsertAssetArgs
  >;
  upsertPage?: Resolver<
    ResolversTypes["Page"],
    ParentType,
    ContextType,
    MutationUpsertPageArgs
  >;
  updateManyAssets?: Resolver<
    ResolversTypes["BatchPayload"],
    ParentType,
    ContextType,
    MutationUpdateManyAssetsArgs
  >;
  updateManyPages?: Resolver<
    ResolversTypes["BatchPayload"],
    ParentType,
    ContextType,
    MutationUpdateManyPagesArgs
  >;
  deleteManyAssets?: Resolver<
    ResolversTypes["BatchPayload"],
    ParentType,
    ContextType,
    MutationDeleteManyAssetsArgs
  >;
  deleteManyLocations?: Resolver<
    ResolversTypes["BatchPayload"],
    ParentType,
    ContextType,
    MutationDeleteManyLocationsArgs
  >;
  deleteManyPages?: Resolver<
    ResolversTypes["BatchPayload"],
    ParentType,
    ContextType,
    MutationDeleteManyPagesArgs
  >;
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

export type NodeResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["Node"]
> = {
  __resolveType: TypeResolveFn<
    "Asset" | "Page" | "Location",
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
};

export type PageResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["Page"]
> = {
  status?: Resolver<ResolversTypes["Status"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  header?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  mainImage?: Resolver<Maybe<ResolversTypes["Asset"]>, ParentType, ContextType>;
  imageHeader?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  imageSubheader?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  intro?: Resolver<Maybe<ResolversTypes["RichText"]>, ParentType, ContextType>;
  main?: Resolver<Maybe<ResolversTypes["RichText"]>, ParentType, ContextType>;
  blurbs?: Resolver<Maybe<ResolversTypes["RichText"]>, ParentType, ContextType>;
  outro?: Resolver<Maybe<ResolversTypes["RichText"]>, ParentType, ContextType>;
};

export type PageConnectionResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["PageConnection"]
> = {
  pageInfo?: Resolver<ResolversTypes["PageInfo"], ParentType, ContextType>;
  edges?: Resolver<
    ReadonlyArray<Maybe<ResolversTypes["PageEdge"]>>,
    ParentType,
    ContextType
  >;
  aggregate?: Resolver<
    ResolversTypes["AggregatePage"],
    ParentType,
    ContextType
  >;
};

export type PageEdgeResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["PageEdge"]
> = {
  node?: Resolver<ResolversTypes["Page"], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["PageInfo"]
> = {
  hasNextPage?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType
  >;
  startCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  endCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
};

export type PagePreviousValuesResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["PagePreviousValues"]
> = {
  status?: Resolver<ResolversTypes["Status"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["DateTime"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  header?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  imageHeader?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  imageSubheader?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  intro?: Resolver<Maybe<ResolversTypes["RichText"]>, ParentType, ContextType>;
  main?: Resolver<Maybe<ResolversTypes["RichText"]>, ParentType, ContextType>;
  blurbs?: Resolver<Maybe<ResolversTypes["RichText"]>, ParentType, ContextType>;
  outro?: Resolver<Maybe<ResolversTypes["RichText"]>, ParentType, ContextType>;
};

export type PageSubscriptionPayloadResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["PageSubscriptionPayload"]
> = {
  mutation?: Resolver<ResolversTypes["MutationType"], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes["Page"]>, ParentType, ContextType>;
  updatedFields?: Resolver<
    Maybe<ReadonlyArray<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  previousValues?: Resolver<
    Maybe<ResolversTypes["PagePreviousValues"]>,
    ParentType,
    ContextType
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
  assets?: Resolver<
    ReadonlyArray<Maybe<ResolversTypes["Asset"]>>,
    ParentType,
    ContextType,
    QueryAssetsArgs
  >;
  locations?: Resolver<
    ReadonlyArray<Maybe<ResolversTypes["Location"]>>,
    ParentType,
    ContextType,
    QueryLocationsArgs
  >;
  pages?: Resolver<
    ReadonlyArray<Maybe<ResolversTypes["Page"]>>,
    ParentType,
    ContextType,
    QueryPagesArgs
  >;
  asset?: Resolver<
    Maybe<ResolversTypes["Asset"]>,
    ParentType,
    ContextType,
    QueryAssetArgs
  >;
  location?: Resolver<
    Maybe<ResolversTypes["Location"]>,
    ParentType,
    ContextType,
    QueryLocationArgs
  >;
  page?: Resolver<
    Maybe<ResolversTypes["Page"]>,
    ParentType,
    ContextType,
    QueryPageArgs
  >;
  assetsConnection?: Resolver<
    ResolversTypes["AssetConnection"],
    ParentType,
    ContextType,
    QueryAssetsConnectionArgs
  >;
  locationsConnection?: Resolver<
    ResolversTypes["LocationConnection"],
    ParentType,
    ContextType,
    QueryLocationsConnectionArgs
  >;
  pagesConnection?: Resolver<
    ResolversTypes["PageConnection"],
    ParentType,
    ContextType,
    QueryPagesConnectionArgs
  >;
  node?: Resolver<
    Maybe<ResolversTypes["Node"]>,
    ParentType,
    ContextType,
    QueryNodeArgs
  >;
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

export type RgbaResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["RGBA"]
> = {
  r?: Resolver<ResolversTypes["RGBAHue"], ParentType, ContextType>;
  g?: Resolver<ResolversTypes["RGBAHue"], ParentType, ContextType>;
  b?: Resolver<ResolversTypes["RGBAHue"], ParentType, ContextType>;
  a?: Resolver<ResolversTypes["RGBATransparency"], ParentType, ContextType>;
};

export interface RgbaHueScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["RGBAHue"], any> {
  name: "RGBAHue";
}

export interface RgbaTransparencyScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["RGBATransparency"], any> {
  name: "RGBATransparency";
}

export type RichTextResolvers<
  ContextType = AppContext,
  ParentType = ResolversTypes["RichText"]
> = {
  raw?: Resolver<Maybe<ResolversTypes["RichTextAST"]>, ParentType, ContextType>;
  html?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  markdown?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
};

export interface RichTextAstScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["RichTextAST"], any> {
  name: "RichTextAST";
}

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
  AggregateAsset?: AggregateAssetResolvers<ContextType>;
  AggregateLocation?: AggregateLocationResolvers<ContextType>;
  AggregatePage?: AggregatePageResolvers<ContextType>;
  Asset?: AssetResolvers<ContextType>;
  AssetConnection?: AssetConnectionResolvers<ContextType>;
  AssetEdge?: AssetEdgeResolvers<ContextType>;
  AssetPreviousValues?: AssetPreviousValuesResolvers<ContextType>;
  AssetSubscriptionPayload?: AssetSubscriptionPayloadResolvers<ContextType>;
  AuthResult?: AuthResultResolvers<ContextType>;
  BatchPayload?: BatchPayloadResolvers<ContextType>;
  Card?: CardResolvers<ContextType>;
  Color?: ColorResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  Deck?: DeckResolvers<ContextType>;
  HEX?: GraphQLScalarType;
  Identity?: IdentityResolvers<ContextType>;
  Json?: GraphQLScalarType;
  Language?: LanguageResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  LocationConnection?: LocationConnectionResolvers<ContextType>;
  LocationEdge?: LocationEdgeResolvers<ContextType>;
  LocationPreviousValues?: LocationPreviousValuesResolvers<ContextType>;
  LocationSubscriptionPayload?: LocationSubscriptionPayloadResolvers<
    ContextType
  >;
  Long?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers;
  Page?: PageResolvers<ContextType>;
  PageConnection?: PageConnectionResolvers<ContextType>;
  PageEdge?: PageEdgeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PagePreviousValues?: PagePreviousValuesResolvers<ContextType>;
  PageSubscriptionPayload?: PageSubscriptionPayloadResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  RGBA?: RgbaResolvers<ContextType>;
  RGBAHue?: GraphQLScalarType;
  RGBATransparency?: GraphQLScalarType;
  RichText?: RichTextResolvers<ContextType>;
  RichTextAST?: GraphQLScalarType;
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
