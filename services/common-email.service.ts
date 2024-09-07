import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async mailSender(
    fromEmail: string,
    toEmail: string,
    emailSubject: string,
    emailMessage: string,
  ): Promise<void> {
    try {
      await this.mailerService.sendMail({
        from: fromEmail,
        to: toEmail,
        subject: emailSubject,
        text: emailMessage,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
