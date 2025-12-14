from django.db import models

from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from wagtail.api import APIField

from grapple.models import GraphQLString, GraphQLRichText


class HomePage(Page):
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
    ]

    # REST API fields
    api_fields = [
        APIField("intro"),
    ]

    # GraphQL fields
    graphql_fields = [
        GraphQLRichText("intro"),
    ]


class BlogPage(Page):
    date = models.DateField("Post date")
    intro = models.CharField(max_length=250)
    body = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("date"),
        FieldPanel("intro"),
        FieldPanel("body"),
    ]

    # REST API fields
    api_fields = [
        APIField("date"),
        APIField("intro"),
        APIField("body"),
    ]

    # GraphQL fields
    graphql_fields = [
        GraphQLString("date"),
        GraphQLString("intro"),
        GraphQLRichText("body"),
    ]
