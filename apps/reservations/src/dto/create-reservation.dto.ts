import { IsString } from 'class-validator';
export class CreateReservationDto {
  @IsString()
  start_date: string;
  @IsString()
  end_date: string;
  @IsString()
  place_id: string;
  @IsString()
  invoice_id: string;
}
