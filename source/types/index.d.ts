interface IHTBProfile {
    profile: {
        id: number,
        sso_id: number | null,
        name: string,
        system_owns: number,
        user_owns: number,
        user_bloods: number,
        system_bloods: number,
        team: {
            id: number,
            name: string,
            ranking: number,
            avatar: string
        },
        respects: number,
        rank: string,
        rank_id: number,
        current_rank_progress: number,
        next_rank: string,
        next_rank_points: number,
        rank_ownership: string,
        rank_requirement: number,
        ranking: number,
        avatar: string,
        timezone: string,
        points: number,
        country_name: string,
        country_code: string,
        university_name: string,
        description: string | null,
        github: string | null,
        linkedin: string | null,
        twitter: string | null,
        website: string | null
    }
}

interface IHTBWhoAmIInfo {
    info: {
		id: number,
		name: string,
		email: string,
		timezone: string,
		isVip: boolean,
		isModerator: boolean,
		isBGModerator: boolean,
		isChatBanned: boolean,
		isDedicatedVip: boolean,
		canAccessVIP: boolean,
		canAccessDedilab: boolean,
		isServerVIP: boolean,
		server_id: number,
		avatar: string,
		beta_tester: number,
		rank_id: number,
		onboarding_completed: boolean,
		onboarding_tutorial_complete: number,
		verified: boolean,
		can_delete_avatar:boolean,
		team: null,
		university: null,
		identifier: string,
		hasTeamInvitation: boolean,
		TwoFaEnabled: boolean,
		hasAppTokens: boolean,
		opt_in: number,
		is_sso_connected: boolean,
		subscription_plan: null | any,
		dunning_exists: boolean
    }
}

interface IHTBMachinesList {
	data: IHTBMachines[],
}

interface IHTBMachines {
	id: number,
	avatar: string,
	name: string,
	static_points: number,
	sp_flag: number,
	os: string,
	points: number,
	star: number,
	release: string,
	easy_month: number,
	poweroff: number,
	free: boolean,
	difficulty: number,
	difficultyText: string,
	user_owns_count: number,
	authUserInUserOwns: boolean,
	root_owns_count: number,
	authUserHasReviewed: boolean,
	authUserInRootOwns: boolean,
	isTodo: boolean,
	is_competitive: boolean,
	active: null | boolean,
	feedbackForChart: {
		counterCake: number,
		counterVeryEasy: number,
		counterEasy: number,
		counterTooEasy: number,
		counterMedium: number,
		counterBitHard: number,
		counterHard: number,
		counterTooHard: number,
		counterExHard: number,
		counterBrainFuck: number
	},
	ip: null | string,
	playInfo: {
		isActive: null | boolean,
		expires_at: null | string
	},
	labels: IHTBMachineLabels[] | [],
	recommended: number
}

interface IHTBMachineLabels {
	color: string
	name: string
}

interface IHTBMachineMaker {
	id: number,
	name: string,
	avatar: string,
	isRespected: boolean
}

interface IHTBMachineProfile {
	info: IHTBMachineProfileData
}

interface IHTBMachineProfileData {
	id: number,
	name: string,
	os: string,
	active: number,
	retired: number,
	ip: string,
	points: number,
	static_points: number,
	release: string,
	user_owns_count: number,
	root_owns_count: number,
	free: boolean,
	authUserInUserOwns: boolean,
	authUserInRootOwns: boolean,
	authUserHasReviewed: boolean,
	authUserHasSubmittedMatrix: boolean,
	stars: number,
	reviews_count: number,
	difficulty: number,
	avatar: string,
	feedbackForChart: {
		counterCake: number,
		counterVeryEasy: number,
		counterEasy: number,
		counterTooEasy: number,
		counterMedium: number,
		counterBitHard: number,
		counterHard: number,
		counterTooHard: number,
		counterExHard: number,
		counterBrainFuck: number
	},
	difficultyText: string,
	isCompleted: boolean,
	last_reset_time: string,
	playInfo: {
		isSpawned: null | boolean,
		isSpawning: null | boolean,
		isActive: boolean | null,
		active_player_count: null | number,
		expires_at: null | string,
	},
	maker: IHTBMachineMaker,
	maker2: IHTBMachineMaker | null,
	info_status: null | any,
	authUserFirstUserTime: string,
	authUserFirstRootTime: string,
	user_can_review: boolean,
	can_access_walkthrough: boolean,
	has_changelog: boolean,
	userBlood: IHTBMachineBloodProfile,
	userBloodAvatar: string,
	rootBlood: IHTBMachineBloodProfile,
	rootBloodAvatar: string,
	firstUserBloodTime: string,
	firstRootBloodTime: string,
	recommended: number,
	sp_flag: number,
	season_id: null | number,
	isGuidedEnabled: boolean,
	start_mode: string,
	show_go_vip: boolean,
	show_go_vip_server: boolean,
	ownRank: number,
	academy_modules: [],
	machine_mode: string,
	lab_server: null | any,
}

interface IHTBMachineBloodProfile {
	user: {
		name: string,
		id:  number,
		avatar: string
	},
	created_at: string,
	blood_difference: string
}

interface IHTBSubmitFlagResponse {
	status: number,
	message: string
}
