export namespace InformationHomePage {
    export interface Info{
        competitors: number;
        competitions: number;
        recordNational:number;
        upcomingCompetitions: UpcomingCompetition[];
        rankingNational: RankingNational[];
    }

    export interface UpcomingCompetition{
        id: string;
        name: string;
        venue: string;
        city_name: string;
        country_id: string;
        venue_address: string;
        venue_details: string;
        latitude_microdegrees: number;
        longitude_microdegrees: number;
        competitionDate: string;
        competitionEndDate: string;
        monthDate:string;
        dayDate:number;
    }

    export interface RankingNational{
        personIdNr:string;
        nameNr: string;
        averageNr:number;
        idCompetitionNr:string;
        competitionNr:string;
        competitionCountryIso:string;
    }
}