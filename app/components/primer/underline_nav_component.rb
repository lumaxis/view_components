# frozen_string_literal: true

module Primer
  # Use `UnderlineNav` to style navigation links with a minimal
  # underlined selected state, typically placed at the top
  # of the page.
  # For panel navigation, use <%= link_to_component(Primer::UnderlinePanel) %> instead.
  #
  # @accessibility
  #   - By default, `UnderlineNav` renders links within a `<nav>` element. `<nav>` has an
  #     implicit landmark role of `navigation` which should be reserved for main links.
  #     For a regular set of links, set tag to `:div`.
  #   - See <%= link_to_component(Primer::Navigation::TabComponent) %> for additional
  #     accessibility considerations.
  class UnderlineNavComponent < Primer::Component
    include Primer::TabbedComponentHelper
    include Primer::UnderlineNavHelper

    ALIGN_DEFAULT = :left
    ALIGN_OPTIONS = [ALIGN_DEFAULT, :right].freeze

    BODY_TAG_DEFAULT = :ul

    TAG_DEFAULT = :nav
    TAG_OPTIONS = [TAG_DEFAULT, :div].freeze

    ACTIONS_TAG_DEFAULT = :div
    ACTIONS_TAG_OPTIONS = [ACTIONS_TAG_DEFAULT, :span].freeze

    # Use the tabs to list page links.
    #
    # @param selected [Boolean] Whether the tab is selected.
    # @param system_arguments [Hash] <%= link_to_system_arguments_docs %>
    renders_many :tabs, lambda { |selected: false, **system_arguments|
      system_arguments[:classes] = underline_nav_tab_classes(system_arguments[:classes])

      Primer::Navigation::TabComponent.new(
        list: true,
        selected: selected,
        icon_classes: "UnderlineNav-octicon",
        **system_arguments
      )
    }

    # Use actions for a call to action.
    #
    # @param tag [Symbol] (Primer::UnderlineNavComponent::ACTIONS_TAG_DEFAULT) <%= one_of(Primer::UnderlineNavComponent::ACTIONS_TAG_OPTIONS) %>
    # @param system_arguments [Hash] <%= link_to_system_arguments_docs %>
    renders_one :actions, lambda { |tag: ACTIONS_TAG_DEFAULT, **system_arguments|
      system_arguments[:tag] = fetch_or_fallback(ACTIONS_TAG_OPTIONS, tag, ACTIONS_TAG_DEFAULT)
      system_arguments[:classes] = underline_nav_action_classes(system_arguments[:classes])

      Primer::BaseComponent.new(**system_arguments)
    }

    # @example Default with `<nav>`
    #   @description
    #     This should be reserved for main navigation links. See <%= link_to_accessibility %>.
    #   @code
    #     <%= render(Primer::UnderlineNavComponent.new(label: "Default with nav element")) do |component| %>
    #       <% component.tab(href: "#", selected: true) { "Item 1" } %>
    #       <% component.tab(href: "#") { "Item 2" } %>
    #       <% component.actions do %>
    #         <%= render(Primer::ButtonComponent.new) { "Button!" } %>
    #       <% end %>
    #     <% end %>
    #
    # @example With `<div>`
    #   <%= render(Primer::UnderlineNavComponent.new(tag: :div, label: "With div element")) do |component| %>
    #     <% component.tab(href: "#", selected: true) { "Item 1" } %>
    #     <% component.tab(href: "#") { "Item 2" } %>
    #     <% component.actions do %>
    #       <%= render(Primer::ButtonComponent.new) { "Button!" } %>
    #     <% end %>
    #   <% end %>
    #
    # @example With icons and counters
    #   <%= render(Primer::UnderlineNavComponent.new(label: "With icons and counters")) do |component| %>
    #     <% component.tab(href: "#", selected: true) do |t| %>
    #       <% t.icon(icon: :star) %>
    #       <% t.text { "Item 1" } %>
    #     <% end %>
    #     <% component.tab(href: "#") do |t| %>
    #       <% t.icon(icon: :star) %>
    #       <% t.text { "Item 2" } %>
    #       <% t.counter(count: 10) %>
    #     <% end %>
    #     <% component.tab(href: "#") do |t| %>
    #       <% t.text { "Item 3" } %>
    #       <% t.counter(count: 10) %>
    #     <% end %>
    #     <% component.actions do %>
    #       <%= render(Primer::ButtonComponent.new) { "Button!" } %>
    #     <% end %>
    #   <% end %>
    #
    # @example Align right
    #   <%= render(Primer::UnderlineNavComponent.new(label: "Align right", align: :right)) do |component| %>
    #     <% component.tab(href: "#", selected: true) do |t| %>
    #       <% t.text { "Item 1" } %>
    #     <% end %>
    #     <% component.tab(href: "#") do |t| %>
    #       <% t.text { "Item 2" } %>
    #     <% end %>
    #     <% component.actions do %>
    #       <%= render(Primer::ButtonComponent.new) { "Button!" } %>
    #     <% end %>
    #   <% end %>
    #
    # @example Customizing the body
    #   <%= render(Primer::UnderlineNavComponent.new(label: "Default", body_arguments: { classes: "custom-class", border: true, border_color: :info })) do |c| %>
    #     <% c.tab(selected: true, href: "#") { "Tab 1" }%>
    #     <% c.tab(href: "#") { "Tab 2" } %>
    #     <% c.tab(href: "#") { "Tab 3" } %>
    #   <% end %>
    #
    # @param tag [Symbol] <%= one_of(Primer::UnderlineNavComponent::TAG_OPTIONS) %>
    # @param label [String] The `aria-label` on top level element.
    # @param align [Symbol] <%= one_of(Primer::UnderlineNavComponent::ALIGN_OPTIONS) %> - Defaults to <%= Primer::UnderlineNavComponent::ALIGN_DEFAULT %>
    # @param body_arguments [Hash] <%= link_to_system_arguments_docs %> for the body wrapper.
    # @param system_arguments [Hash] <%= link_to_system_arguments_docs %>
    def initialize(tag: TAG_DEFAULT, label:, align: ALIGN_DEFAULT, body_arguments: {}, **system_arguments)
      @align = fetch_or_fallback(ALIGN_OPTIONS, align, ALIGN_DEFAULT)

      @system_arguments = system_arguments
      @system_arguments[:tag] = fetch_or_fallback(TAG_OPTIONS, tag, TAG_DEFAULT)
      @system_arguments[:classes] = underline_nav_classes(@system_arguments[:classes], @align)

      @body_arguments = body_arguments
      @body_arguments[:tag] = :ul
      @body_arguments[:classes] = underline_nav_body_classes(@body_arguments[:classes])

      @system_arguments[:tag] == :nav ? @system_arguments[:"aria-label"] = label : @body_arguments[:"aria-label"] = label
    end

    private

    def body
      Primer::BaseComponent.new(**@body_arguments)
    end
  end
end
