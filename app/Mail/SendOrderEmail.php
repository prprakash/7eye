<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendOrderEmail extends Mailable
{
    use Queueable, SerializesModels;
    protected $mail_data;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($mail_data = [])
    {
        $this->mail_data = $mail_data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        /* return (new MailMessage)
                ->subject($this->mail_data['subject'])
                ->markdown('mail.contact-submission', ['body_message' => $this->mail_data['body_message'], 'form_data' => $this->mail_data['request']]); */
        return $this->view('emails.order', $this->mail_data);
    }
}
